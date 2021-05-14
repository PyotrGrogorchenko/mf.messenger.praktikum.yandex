import EventBus from './EventBus.js';
import { parser } from './parser.js';
import { VirtDom } from './VirtDom/VirtDOM.js';
import { onRouteClick } from '../router/events.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["FLOW_CWU"] = "flow:component-will-update";
    EVENTS["FLOW_CWM"] = "flow:component-will-mount";
    EVENTS["FLOW_EXECUTE"] = "flow:execute";
    EVENTS["FLOW_COMPILE"] = "flow:compile";
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
        this._isNew = true;
        this._componentDidMountExecuted = false;
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
    components() { return {}; }
    template() { return ''; }
    _registerEvents(eventBus) {
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_CWU, this._componentWillUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
        eventBus.on(EVENTS.FLOW_EXECUTE, this._execute.bind(this));
        eventBus.on(EVENTS.FLOW_COMPILE, this._compile.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init(root) {
        this._root = root;
        if (this._isNew) {
            this.eventBus().emit(EVENTS.FLOW_CWM, this.getProps(), this.getProps());
        }
        else {
            this.eventBus().emit(EVENTS.FLOW_CWU, this.getProps(), this.state);
        }
        this.eventBus().emit(EVENTS.FLOW_EXECUTE);
        if (this._isNew) {
            this.eventBus().emit(EVENTS.FLOW_CDM, this.getProps(), this.state);
        }
        else {
            this.eventBus().emit(EVENTS.FLOW_CDU, this.getProps(), this.getProps());
        }
        this._isNew = false;
    }
    _componentDidMount(props = null, state = null) { this.componentDidMount(props, state); }
    componentDidMount(props = null, state = null) { }
    _componentDidUpdate(oldProps = null, newProps = null) { this.componentDidUpdate(oldProps, newProps); }
    componentDidUpdate(oldProps = null, newProps = null) { }
    _componentWillUpdate(props = null, state = null) { this.componentWillUpdate(props, state); }
    componentWillUpdate(props = null, state = null) { }
    _componentWillMount(props = null, state = null) { this.componentWillMount(props, state); }
    componentWillMount(props = null, state = null) { }
    _execute(modifyState = {}) {
        this.execute(modifyState);
        this.eventBus().emit(EVENTS.FLOW_COMPILE, modifyState);
    }
    execute(modifyState = {}) {
    }
    _compile(modifyState = {}) {
        this.compile(modifyState);
        this.eventBus().emit(EVENTS.FLOW_RENDER, modifyState);
    }
    compile(modifyState = {}) {
        Object.assign(this.state, modifyState);
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
    }
    _render() {
        this.render();
    }
    render() {
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
    setState(modifyState) {
        var _a;
        const oldProps = window.copyObj(this.getProps());
        this.eventBus().emit(EVENTS.FLOW_CWU, this.getProps(), this.state);
        this.eventBus().emit(EVENTS.FLOW_EXECUTE, modifyState);
        this.eventBus().emit(EVENTS.FLOW_CDU, oldProps, this.getProps());
        if (modifyState) {
            (_a = this.virtDOM) === null || _a === void 0 ? void 0 : _a.deleteMarkedNodes();
        }
        window.createValidateEvents();
    }
}
export default Component;
//# sourceMappingURL=Component.js.map