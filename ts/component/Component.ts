import EventBus from './EventBus'
import { Node as PARSER_NODE, parser} from './parser'
import { VirtDom}  from './VirtDom/VirtDOM'
import { Node as DOM_NODE}  from './VirtDom/Node'
import { onRouteClick } from '../router/events'

enum EVENTS {
    INIT = "init", 
    FLOW_CDM = "flow:component-did-mount", 
    FLOW_CDU = "flow:component-did-update", 
    FLOW_RENDER = "flow:render"
  }


class Component {
  
  private _root: HTMLElement | null = null
  private _virtDOM: VirtDom | null = null
  private _props: any = null
  private _rootOut: HTMLElement | null = null
  private _parsedTemplate:Array<PARSER_NODE> | null = null
  private _deleteMark: boolean = false

  state: any = {}

  eventBus: () => EventBus

  /** JSDoc
  * @param {string} tagName
  * @param {Object} props
  *
  * @returns {void}
  */
  constructor(props: any = {}) {
    
    this._root = null
    const eventBus: EventBus = new EventBus()
    this._props = props
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)

  }

  get rootOut(): HTMLElement | null{ return this._rootOut }

  get deleteMark() { return this._deleteMark }
  set deleteMark(value) { this._deleteMark = value }

  get parsedTemplate() { return this._parsedTemplate }
  set parsedTemplate(value) { this._parsedTemplate = value }

  get virtDOM() { return this._virtDOM }
  
  getProps(): any { return this._props }
  setProps(props: any) { this._props = props }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(EVENTS.INIT, this._init.bind(this))
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _init(): void { this.render() }
  init(root: HTMLElement | null): void {
    this._root = root
    this.eventBus().emit(EVENTS.INIT)
  }

  _componentDidMount(): void { this.componentDidMount() }
  componentDidMount(): void { }

  _componentDidUpdate(oldProps: any = null, newProps: any = null): void {}
  componentDidUpdate(_oldProps: any, _newProps: any): boolean { return true }

  components(): any{ return {} }
  template(): string {return ''}

  setState(changedState: LooseObject) {
    this._render(changedState)
  }

  _render(changedState: LooseObject | null = null) { 
    
    if (this._compile(changedState)) {
      this._executeRender()
      this.eventBus().emit(EVENTS.FLOW_CDM)
    }  
    
    if (changedState) {
      this.virtDOM?.deleteMarkedNodes()
      //console.log(changedState)
    }


  }
  render(): void { this.eventBus().emit(EVENTS.FLOW_RENDER) }

  _executeRender() { 
    const nodes: Array<DOM_NODE> = (this._virtDOM as VirtDom).getNodes()

    nodes.forEach(node => {
      
      const root: HTMLElement | null = node.parent && node.parent.root ? node.parent.root : this._root
      if (node.isComponent) {
        (node.componentLink as Component).init(root)
        node.root = (node.componentLink as Component).rootOut
      } else {
 
        //console.log(node.deleteMark, node.header, node.element)
        

        if (node.element) {
          if (node.deleteMark){
            node.element.remove()
            node.element = null
          }
        } else {  
          if (node.deleteMark){
            return
          }
          node.element = document.createElement(node.tagName) as HTMLElement
        }
        
        // if (!node.element) {
        //   node.element = document.createElement(node.tagName) as HTMLElement
        // }
        
        const element: HTMLElement = node.element as HTMLElement
        
        node.changedProps.forEach(prop => {
          if (prop === 'classes') {
            (node.props.classes as Array<string>).forEach(nodeClass => {
              element.classList.add(nodeClass)
            })
          } else if (typeof node.props[prop] === "function") {
            if (prop.startsWith('on')) {
              element.addEventListener(prop.slice(2).toLowerCase(), node.props[prop])
            } else {
              element.setAttribute(prop, node.props[prop])
            }
          } else if ((prop==='href')) {
            if (!node.props[prop]){
              return
            }
            if (node.props[prop].startsWith('#{R}')){
              element.addEventListener('click', onRouteClick)
            }  
            element.setAttribute(prop, node.props[prop])
          } else {
            if (node.props[prop] === '#noValue'){
            } else {
              element.setAttribute(prop, node.props[prop])
            }
          }
        })
        node.changedProps = []

        if (node.textContentIsChanged) {
          element.textContent = node.textContent
          node.textContentIsChanged = false
        }  

        if (node.isNew){
          (root as HTMLElement).appendChild(element)
          this._rootOut = element
          node.root = element
          element.setAttribute('uid', String(node.uid))
        }
      
      }
      
      node.isNew = false

    })

  }

  _compile(changedState: LooseObject | null = null): boolean {

    //let state: any = window.copyObj(this.state)
    Object.assign(this.state, changedState)

    //this.state = state

    //console.log(this.state.list ? this.state.list.length : '')

    let parsedTemplate = this.parsedTemplate
    if (!parsedTemplate){
      parsedTemplate = parser(this.template())
      this.parsedTemplate = parsedTemplate
    }
    
    const components: any = this.components()
    const props: any = this.getProps()
    
    this._virtDOM = !this._virtDOM ? new VirtDom() : this._virtDOM
    this._virtDOM.compile(parsedTemplate as Array<PARSER_NODE>, this.state, props, this.deleteMark)
    
    this._virtDOM.getIsComponent().forEach(node => {
      if (node.componentLink) {
        node.componentLink.setProps(node.props)
      } else {
        node.componentLink = new components[node.tagName](node.props)
      }
      (node.componentLink as Component).deleteMark = node.deleteMark
    })

    return true
  }



//   _makePropsProxy(props) {
//     // Можно и так передать this
//     // Такой способ больше не применяется с приходом ES6+
//     const self = this;
    
//     // PP \\
//     //return props;
//     const proxyProps = new Proxy(props, {
  
//       // get(target, prop){
//       //   return target[prop]
//       // },
  
//       set(target, prop, value) {
//         const oldProps = {...target}
//         target[prop] = value
//         //self._propsDidChange = JSON.stringify(oldProps) !== JSON.stringify(target)
//         if (JSON.stringify(oldProps) !== JSON.stringify(target)) {
//           self._render()  
//         }
//         self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, target)
//         return true
//       },
      
//       deleteProperty(target, prop) {
//         throw new Error('Нет прав')
//       }
    
//     });    
    
//     return proxyProps
//     // PP //
  
//   }

  // setProps = nextProps => {
  //   if (!nextProps) {
  //     return
  //   }
  //   Object.assign(this.props, nextProps)
  // }

  // get element() {
  //   return this._element
  // }


}

export default Component
