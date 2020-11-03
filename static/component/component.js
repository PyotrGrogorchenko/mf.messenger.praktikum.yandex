"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_bus_js_1 = __importDefault(require("./event-bus.js"));
const virtDOM_js_1 = __importDefault(require("./virtDOM.js"));
const parser_js_1 = require("./parser.js");
class Component {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(props = {}) {
        this._root = null;
        //_element = null
        this._virtDOM = null;
        this._props = null;
        this._rootOut = null;
        const eventBus = new event_bus_js_1.default();
        this._props = props;
        //this.props = this._makePropsProxy(props)
        this.eventBus = () => eventBus;
        this._props = props;
        this._registerEvents(eventBus);
        eventBus.emit(Component.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        // PP \\
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        // PP //
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init() {
        this._compile();
        this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount(oldProps) { }
    _componentDidUpdate(oldProps, newProps) {
        // const response = this.componentDidUpdate(oldProps, newProps)
        // this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
    componentDidUpdate(oldProps, newProps) {
        return true;
    }
    components(parsedTemplate) {
        // const importComponents = []
        // for(let i = 0; i < parsedTemplate.length; i++) {
        //   const item = parsedTemplate[i]
        //   if (item.type === PARSER_TYPES.BEGIN && window.startsWithUpper(item.content)) { 
        //     importComponents.push(VirtDom.getTagName(item.content))
        //   }   
        // }
        // const importComponentsStr = '{' + String(importComponents) + '}'
        // let res
        // eval(`res = {${String(importComponents) }}`)
        return {};
    }
    state() { return {}; }
    template() { return ''; }
    render(root) {
        this._root = root;
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
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
        const parsedTemplate = parser_js_1.parser(template);
        //console.log(parsedTemplate)
        const state = this.state();
        const props = this.getProps();
        const virtDom = new virtDOM_js_1.default(parsedTemplate, state, props);
        virtDom.getIsComponent().forEach(node => {
            let code = `node.componentLink = new components.${node.tagName}(node.props)`;
            eval(code);
        });
        // virtDom.getNodes().forEach(node => {
        //   if (node.isComponent){
        //     let code = `node.componentLink = new components.${node.tagName}(node.props)`
        //     eval(code)
        //   } else {
        //     node.componentLink = this   
        //   }
        // })
        this._virtDOM = virtDom;
        //console.log(virtDom)
    }
    _render() {
        const nodes = this._virtDOM.getNodes();
        nodes.forEach(node => {
            const root = node.owner && node.owner.root ? node.owner.root : this._root;
            if (node.isComponent) {
                node.componentLink.render(root);
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
                            element[prop] = node.props[prop];
                        }
                    }
                    else {
                        element.setAttribute(prop, node.props[prop]);
                    }
                });
                element.setAttribute('uid', node.uid);
                element.textContent = node.content;
                root.appendChild(element);
                this._rootOut = element;
                node.root = element;
            }
        });
    }
    // getContent() {
    //   return this.element
    // }
    _makePropsProxy(props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        // PP \\
        //return props;
        const proxyProps = new Proxy(props, {
            // get(target, prop){
            //   return target[prop]
            // },
            set(target, prop, value) {
                const oldProps = Object.assign({}, target);
                target[prop] = value;
                //self._propsDidChange = JSON.stringify(oldProps) !== JSON.stringify(target)
                if (JSON.stringify(oldProps) !== JSON.stringify(target)) {
                    self._render();
                }
                self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty(target, prop) {
                throw new Error('Нет прав');
            }
        });
        return proxyProps;
        // PP //
    }
}
Component.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
};
// PP \\
exports.default = Component;
// PP //
//# sourceMappingURL=component.js.map