import EventBus from './event-bus.js';
import { parser } from './parser.js';
import { VirtDom } from './virtDOM.js';
// import VirtDom from './virtDOM.js'
// import { parser, PARSER_TYPES } from './parser.js'
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
        //console.log('component')
        //   static EVENTS = {
        //     INIT: "init",
        //     FLOW_CDM: "flow:component-did-mount",
        //     FLOW_CDU: "flow:component-did-update",
        //     FLOW_RENDER: "flow:render"
        //   };
        this._root = null;
        //_element = null
        this._virtDOM = null;
        this._props = null;
        this._rootOut = null;
        const eventBus = new EventBus();
        this._props = props;
        //this.props = this._makePropsProxy(props)
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        // PP \\
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        // PP //
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init() {
        this._compile();
        this.eventBus().emit(EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount(oldProps = {}) { }
    _componentDidUpdate(oldProps = null, newProps = null) {
        // const response = this.componentDidUpdate(oldProps, newProps)
        // this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
    componentDidUpdate(oldProps, newProps) {
        return true;
    }
    components() {
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
        //console.log(parsedTemplate)
        const state = this.state();
        const props = this.getProps();
        const virtDom = new VirtDom(parsedTemplate, state, props);
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
                            element.setAttribute(prop, node.props[prop]);
                        }
                    }
                    else {
                        element.setAttribute(prop, node.props[prop]);
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
}
// PP \\
export default Component;
// PP //
//# sourceMappingURL=component.js.map