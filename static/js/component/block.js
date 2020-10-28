import EventBus from './event-bus.js'
import VirtDom from './virtDOM.js'
import { parser } from './parser.js'

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _root = null
  //_element = null
  _virtDOM = null
  _props = null
  _rootOut = null

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props = {}) {
    
    const eventBus = new EventBus()
    this._props = props
    //this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus
    this._props = props

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    // PP \\
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    // PP //
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init() {
    this._compile()
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }


  _componentDidMount() {
    this.componentDidMount()
  }
  componentDidMount(oldProps) {}

  _componentDidUpdate(oldProps, newProps) {
    // const response = this.componentDidUpdate(oldProps, newProps)
    // this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  componentDidUpdate(oldProps, newProps) {
    return true
  }

  components(){return {}}
  state(){return {}}
  template(){return ''}

  render(root) {
    this._root = root
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }


  setProps = nextProps => {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
  }

  // get element() {
  //   return this._element
  // }

  get rootOut(){
    return this._rootOut
  }

  getProps() {
    return this._props
  }

  _compile() {

    const components = this.components()
    const template = this.template()
   
    const state = this.state()
    const params = {state, props: this.getProps()}
    
    const parsedTemplate = parser(template)
    
    console.log(parsedTemplate)

    const virtDom = new VirtDom()
    virtDom.init(parsedTemplate, params)

    console.log(virtDom)

    virtDom.getIsComponent().forEach(component => {
      let code = `component.componentLink = new components.${component.tagName}(component.props)`
      eval(code)
    })

    this._virtDOM = virtDom

  }
  
  _render() { 
    
    const nodes = this._virtDOM.getNodes()

    nodes.forEach(node => {
      
      const root = node.owner && node.owner.root ? node.owner.root : this._root
      if (node.isComponent) {
        node.componentLink.render(root)
        node.root = node.componentLink.rootOut
      } else {
        const element = document.createElement(node.tagName)
        
        Object.keys(node.props).forEach(prop => {
          if (prop === 'classes') {
            node.props.classes.forEach(nodeClass => {
              element.classList.add(nodeClass)
            })
          } else {
            element.setAttribute(prop, node.props[prop])
          }

        })

        element.textContent = node.content
        root.appendChild(element)
        this._rootOut = element
        node.root = element
      }

    })

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
        const oldProps = {...target}
        target[prop] = value
        //self._propsDidChange = JSON.stringify(oldProps) !== JSON.stringify(target)
        if (JSON.stringify(oldProps) !== JSON.stringify(target)) {
          self._render()  
        }
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target)
        return true
      },
      
      deleteProperty(target, prop) {
        throw new Error('Нет прав')
      }
    
    });    
    
    return proxyProps
    // PP //
  
  }

  // _createDocumentElement(tagName) {
  //   // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
  //   return document.createElement(tagName)
  // }

  // show() {
  //   this._element.style.display = 'block'
  // }

  // hide() {
  //   this._element.style.display = 'none'
  // }
}

// PP \\
export default Block
// PP //