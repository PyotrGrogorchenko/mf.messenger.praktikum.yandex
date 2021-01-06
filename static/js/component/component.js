import EventBus from './event-bus.js';
import { parser } from './parser.js';
import { VirtDom } from './virtDOM.js';
import { onRouteClick } from '../router/events.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["FLOW_RENDER"] = "flow:render";
})(EVENTS || (EVENTS = {}));
class Component {
    /** JSDoc
    * @param {string} tagName
    * @param {Object} props
    *
    * @returns {void}
    */
    constructor(props = {}) {
        this._root = null;
        this._virtDOM = null;
        this._props = null;
        this._rootOut = null;
        this.state = {};
        this._root = null;
        const eventBus = new EventBus();
        this._props = props;
        //this.props = this._makePropsProxy(props)
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        //eventBus.emit(EVENTS.INIT)
    }
    _registerEvents(eventBus) {
        eventBus.on(EVENTS.INIT, this._init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init(root) {
        this._root = root;
        this.eventBus().emit(EVENTS.INIT);
    }
    _init() {
        this._compile();
        //this.eventBus().emit(EVENTS.INIT)
        //this.eventBus().emit(EVENTS.FLOW_CDM)
        this.render();
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount() { }
    _componentDidUpdate(oldProps = null, newProps = null) {
    }
    componentDidUpdate(_oldProps, _newProps) {
        return true;
    }
    components() {
        return {};
    }
    //state(): any {return {}}
    template() { return ''; }
    render() {
        this.eventBus().emit(EVENTS.FLOW_RENDER);
    }
    // setProps = nextProps => {
    //   if (!nextProps) {
    //     return
    //   }
    //   Object.assign(this.props, nextProps)
    // }
    // get element() {
    //   return this._element
    // }
    get rootOut() {
        return this._rootOut;
    }
    getProps() {
        return this._props;
    }
    _compile() {
        const template = this.template();
        const components = this.components();
        const parsedTemplate = parser(template);
        const state = this.state;
        const props = this.getProps();
        const virtDom = new VirtDom(parsedTemplate, state, props);
        virtDom.getIsComponent().forEach(node => {
            const componentLink = new components[node.tagName](node.props);
            node.componentLink = componentLink;
        });
        this._virtDOM = virtDom;
    }
    _render() {
        this._executeRender();
        this.eventBus().emit(EVENTS.FLOW_CDM);
    }
    _executeRender() {
        const nodes = this._virtDOM.getNodes();
        nodes.forEach(node => {
            const root = node.owner && node.owner.root ? node.owner.root : this._root;
            if (node.isComponent) {
                node.componentLink.init(root);
                node.root = node.componentLink.rootOut;
            }
            else {
                const element = document.createElement(node.tagName);
                Object.keys(node.props).forEach(prop => {
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
                        //&& node.props[prop].startsWith('#{R}')
                        if (node.props[prop].startsWith('#{R}')) {
                            element.addEventListener('click', onRouteClick);
                        }
                        element.setAttribute(prop, node.props[prop]);
                    }
                    else {
                        if (node.props[prop] === '#noValue') {
                            //(element as any)[prop] = true
                        }
                        else {
                            //console.log(prop, node.props[prop])
                            element.setAttribute(prop, node.props[prop]);
                        }
                    }
                });
                element.setAttribute('uid', String(node.uid));
                element.textContent = node.content;
                root.appendChild(element);
                this._rootOut = element;
                node.root = element;
            }
        });
    }
    setState(newState) {
        console.log('newState', newState);
    }
}
export default Component;
//# sourceMappingURL=component.js.map