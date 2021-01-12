import EventBus from './EventBus.js';
import { parser } from './parser.js';
import { VirtDom } from './VirtDom/VirtDOM.js';
import { onRouteClick } from '../router/events.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["FLOW_RENDER"] = "flow:render";
})(EVENTS || (EVENTS = {}));
class Component {
    constructor(props = {}) {
        this._root = null;
        this._virtDOM = null;
        this._props = null;
        this._rootOut = null;
        this._parsedTemplate = null;
        this._deleteMark = false;
        this.state = {};
        this._root = null;
        const eventBus = new EventBus();
        this._props = props;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
    }
    get rootOut() { return this._rootOut; }
    get deleteMark() { return this._deleteMark; }
    set deleteMark(value) { this._deleteMark = value; }
    get parsedTemplate() { return this._parsedTemplate; }
    set parsedTemplate(value) { this._parsedTemplate = value; }
    get virtDOM() { return this._virtDOM; }
    getProps() { return this._props; }
    setProps(props) { this._props = props; }
    _registerEvents(eventBus) {
        eventBus.on(EVENTS.INIT, this._init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _init() { this.render(); }
    init(root) {
        this._root = root;
        this.eventBus().emit(EVENTS.INIT);
    }
    _componentDidMount() { this.componentDidMount(); }
    componentDidMount() { }
    _componentDidUpdate(oldProps = null, newProps = null) { }
    componentDidUpdate(_oldProps, _newProps) { return true; }
    components() { return {}; }
    template() { return ''; }
    setState(changedState) {
        this._render(changedState);
    }
    _render(changedState = null) {
        var _a;
        if (this._compile(changedState)) {
            this._executeRender();
            this.eventBus().emit(EVENTS.FLOW_CDM);
        }
        if (changedState) {
            (_a = this.virtDOM) === null || _a === void 0 ? void 0 : _a.deleteMarkedNodes();
        }
    }
    render() { this.eventBus().emit(EVENTS.FLOW_RENDER); }
    _executeRender() {
        const nodes = this._virtDOM.getNodes();
        nodes.forEach(node => {
            const root = node.parent && node.parent.root ? node.parent.root : this._root;
            if (node.isComponent) {
                node.componentLink.init(root);
                node.root = node.componentLink.rootOut;
            }
            else {
                if (node.element) {
                    if (node.deleteMark) {
                        node.element.remove();
                        node.element = null;
                    }
                }
                else {
                    if (node.deleteMark) {
                        return;
                    }
                    node.element = document.createElement(node.tagName);
                }
                const element = node.element;
                node.changedProps.forEach(prop => {
                    if (prop === 'classes') {
                        node.props.classes.forEach(nodeClass => {
                            element.classList.add(nodeClass);
                        });
                    }
                    else if (typeof node.props[prop] === "function") {
                        if (prop.startsWith('on')) {
                            element.addEventListener(prop.slice(2).toLowerCase(), node.props[prop]);
                        }
                        else {
                            element.setAttribute(prop, node.props[prop]);
                        }
                    }
                    else if ((prop === 'href')) {
                        if (!node.props[prop]) {
                            return;
                        }
                        if (node.props[prop].startsWith('#{R}')) {
                            element.addEventListener('click', onRouteClick);
                        }
                        element.setAttribute(prop, node.props[prop]);
                    }
                    else {
                        if (node.props[prop] === '#noValue') {
                        }
                        else {
                            element.setAttribute(prop, node.props[prop]);
                        }
                    }
                });
                node.changedProps = [];
                if (node.textContentIsChanged) {
                    element.textContent = node.textContent;
                    node.textContentIsChanged = false;
                }
                if (node.isNew) {
                    root.appendChild(element);
                    this._rootOut = element;
                    node.root = element;
                    element.setAttribute('uid', String(node.uid));
                }
            }
            node.isNew = false;
        });
    }
    _compile(changedState = null) {
        Object.assign(this.state, changedState);
        let parsedTemplate = this.parsedTemplate;
        if (!parsedTemplate) {
            parsedTemplate = parser(this.template());
            this.parsedTemplate = parsedTemplate;
        }
        const components = this.components();
        const props = this.getProps();
        this._virtDOM = !this._virtDOM ? new VirtDom() : this._virtDOM;
        this._virtDOM.compile(parsedTemplate, this.state, props, this.deleteMark);
        this._virtDOM.getIsComponent().forEach(node => {
            if (node.componentLink) {
                node.componentLink.setProps(node.props);
            }
            else {
                node.componentLink = new components[node.tagName](node.props);
            }
            node.componentLink.deleteMark = node.deleteMark;
        });
        return true;
    }
}
export default Component;
//# sourceMappingURL=Component.js.map