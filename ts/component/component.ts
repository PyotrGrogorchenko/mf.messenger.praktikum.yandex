import EventBus from './event-bus'
import { Node as PARSER_NODE, parser} from './parser'
import { VirtDom, Node as DOM_NODE }  from './virtDOM'
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
    this._compile()
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

  getProps(): any {
    return this._props
  }

  _compile(): void {

    const template: string = this.template()
    const components: any = this.components()

    const parsedTemplate: Array<PARSER_NODE> = parser(template)
    
    const state: any = this.state
    const props: any = this.getProps()
    
    const virtDom: VirtDom = new VirtDom(parsedTemplate, state, props)

    virtDom.getIsComponent().forEach(node => {
      const componentLink = new components[node.tagName](node.props)
      node.componentLink = componentLink
    })

    this._virtDOM = virtDom
  }
  
  _render() { 
    this._executeRender()
    this.eventBus().emit(EVENTS.FLOW_CDM)
  }

  _executeRender() { 
    const nodes: Array<DOM_NODE> = (this._virtDOM as VirtDom).getNodes()

    nodes.forEach(node => {
      
      const root: HTMLElement | null = node.owner && node.owner.root ? node.owner.root : this._root
      if (node.isComponent) {
        (node.componentLink as Component).init(root)
        node.root = (node.componentLink as Component).rootOut
      } else {
        const element: HTMLElement = document.createElement(node.tagName)
        
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
              //console.log(prop, node.props[prop])
              element.setAttribute(prop, node.props[prop])
            }
            
          }

        })

        element.setAttribute('uid', String(node.uid))
        element.textContent = node.content as string
        
        (root as HTMLElement).appendChild(element)
        this._rootOut = element
        node.root = element
      }

    })

  }

  setState(newState: LooseObject) {
    console.log('newState', newState)
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
