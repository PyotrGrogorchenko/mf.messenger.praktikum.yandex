import EventBus from './event-bus'
import { Node as PARSER_NODE, parser} from './parser'
import { VirtDom, Node as DOM_NODE, NODE_ACTION }  from './virtDOM'
import { onRouteClick } from '../router/events'

enum EVENTS {
    INIT = "init", 
    FLOW_CDM = "flow:component-did-mount", 
    FLOW_CDU = "flow:component-did-update", 
    FLOW_RENDER = "flow:render"
  }


class Component {
  
  _root: HTMLElement | null = null
  _virtDOM: VirtDom | null = null
  _props: any = null
  _rootOut: HTMLElement | null = null
  _parsedTemplate:Array<PARSER_NODE> | null = null

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
   //this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    //eventBus.emit(EVENTS.INIT)

  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(EVENTS.INIT, this._init.bind(this))
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init(root: HTMLElement | null): void {
    this._root = root
    this.eventBus().emit(EVENTS.INIT)
  }
  _init(): void {
    //this._compile()
    //this.eventBus().emit(EVENTS.INIT)
    //this.eventBus().emit(EVENTS.FLOW_CDM)
    this.render()
  }

  _componentDidMount(): void {
    this.componentDidMount()
  }
  componentDidMount(): void { }

  _componentDidUpdate(oldProps: any = null, newProps: any = null): void {
  }

  componentDidUpdate(_oldProps: any, _newProps: any): boolean {
    return true
  }

  components(): any{
    return {}
  }

  //state(): any {return {}}
  
  template(): string {return ''}

  render(): void {
    this.eventBus().emit(EVENTS.FLOW_RENDER)
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

  get rootOut(): HTMLElement | null{
    return this._rootOut
  }

  get parsedTemplate() { return this._parsedTemplate }
  set parsedTemplate(value) { this._parsedTemplate = value }

  getProps(): any {
    return this._props
  }

  _compile(changedState: LooseObject | null = null): boolean {

    let state: any = {...this.state}
     
    if (changedState) {
      Object.assign(state, changedState)
      if (window.isEqual(this.state, state)){
        return false
      }
    }

    let parsedTemplate = this.parsedTemplate
    if (!parsedTemplate){
      parsedTemplate = parser(this.template())
      this.parsedTemplate = parsedTemplate
    }
    
    const components: any = this.components()
    const props: any = this.getProps()
    
    this._virtDOM = !this._virtDOM ? new VirtDom() : this._virtDOM
    this._virtDOM.compile(parsedTemplate as Array<PARSER_NODE>, state, props)
    this._virtDOM.getIsComponent().forEach(node => {
      if (!node.componentLink) {
        node.componentLink = new components[node.tagName](node.props)
      }
    })

    return true
  }
  
  _render(changedState: LooseObject | null = null) { 
    if (this._compile(changedState)) {
      this._executeRender()
      this.eventBus().emit(EVENTS.FLOW_CDM)
    }  
  }

  _executeRender() { 
    const nodes: Array<DOM_NODE> = (this._virtDOM as VirtDom).getNodes()

    nodes.forEach(node => {
      
      if (node.action === NODE_ACTION.NO_ACTION){
        return  
      }

      const root: HTMLElement | null = node.owner && node.owner.root ? node.owner.root : this._root
      if (node.isComponent) {
        (node.componentLink as Component).init(root)
        node.root = (node.componentLink as Component).rootOut
      } else {
        
        let element: HTMLElement
        if (node.action === NODE_ACTION.UPDATE){
          // const querySelector = `[uid="${node.uid}"` + !node.key ? '' : `,key="${node.key}"]`
          //element = document.querySelectorAll(querySelector)

          // element = document.querySelectorAll(querySelector)

          // if (node.key){
          //   const elements = document.querySelectorAll(`[uid="${node.uid}"`)
          //   console.log(elements)
          // } else {
          //   element = document.querySelector(`[uid="${node.uid}"`) as HTMLElement
          // }

          element = document.querySelector(`[uid="${node.uid}"`) as HTMLElement

        } else {
          element = document.createElement(node.tagName)
        }
        
        Object.keys(node.props).forEach(prop => {
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
            //&& node.props[prop].startsWith('#{R}')
            if (node.props[prop].startsWith('#{R}')){
              element.addEventListener('click', onRouteClick)
            }  
            element.setAttribute(prop, node.props[prop])
          } else {
            if (node.props[prop] === '#noValue'){
              //(element as any)[prop] = true
            } else {
              element.setAttribute(prop, node.props[prop])
            }

          }

        })
        
        if (node.action === NODE_ACTION.NEW){
          element.setAttribute('uid', String(node.uid))
          // ВНИМАНИЕ ВОПРОС!!! \\
          // Как обновить?
          element.textContent = node.content as string
          // ВНИМАНИЕ ВОПРОС!!! //
          (root as HTMLElement).appendChild(element)
          this._rootOut = element
          node.root = element
        }

      }

    })

  }

  setState(changedState: LooseObject) {
    //console.log('newState', newState)
    this._render(changedState)
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

}

export default Component
