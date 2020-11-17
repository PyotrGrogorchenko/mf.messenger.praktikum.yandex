import EventBus from './event-bus.js'
import { Node as PARSER_NODE, parser} from './parser.js'
import { VirtDom, Node as DOM_NODE }  from './virtDOM.js'
//import { Router, onRouteClick } from '../router/Router.js'
import { onRouteClick } from '../router/events.js'

// import VirtDom from './virtDOM.js'
// import { parser, PARSER_TYPES } from './parser.js'

enum EVENTS {
    INIT = "init", 
    FLOW_CDM = "flow:component-did-mount", 
    FLOW_CDU = "flow:component-did-update", 
    FLOW_RENDER = "flow:render"
  }


class Component {
//   static EVENTS = {
//     INIT: "init",
//     FLOW_CDM: "flow:component-did-mount",
//     FLOW_CDU: "flow:component-did-update",
//     FLOW_RENDER: "flow:render"
//   };

  _root: HTMLElement | null = null
  //_element = null
  _virtDOM: VirtDom | null = null
  _props: any = null
  _rootOut: HTMLElement | null = null
  eventBus: () => EventBus


  /** JSDoc
  * @param {string} tagName
  * @param {Object} props
  *
  * @returns {void}
  */
  constructor(props: any = {}) {
    
    //console.log('component')

    const eventBus: EventBus = new EventBus()
    this._props = props
   //this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(EVENTS.INIT)

  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(EVENTS.INIT, this.init.bind(this))
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    // PP \\
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    // PP //
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init(): void {
    this._compile()
    this.eventBus().emit(EVENTS.FLOW_CDM)
  }


  _componentDidMount(): void {
    this.componentDidMount()
  }
  componentDidMount(oldProps: any = {}): void {}

  _componentDidUpdate(oldProps: any = null, newProps: any = null): void {
    // const response = this.componentDidUpdate(oldProps, newProps)
    // this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true
  }

  components(): any{
   
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

    return {}
  }

  state(): any {return {}}
  template(): string {return ''}

  render(root: HTMLElement | null): void {
    this._root = root
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
    
    //console.log(parsedTemplate)

    const state: any = this.state()
    const props: any = this.getProps()
    

    const virtDom: VirtDom = new VirtDom(parsedTemplate, state, props)

    virtDom.getIsComponent().forEach(node => {
      let code: string = `node.componentLink = new components.${node.tagName}(node.props)`
      eval(code)
    })

    // virtDom.getNodes().forEach(node => {
    //   if (node.isComponent){
    //     let code = `node.componentLink = new components.${node.tagName}(node.props)`
    //     eval(code)
    //   } else {
    //     node.componentLink = this   
    //   }
    // })


    this._virtDOM = virtDom

    //console.log(virtDom)

  }
  
  _render() { 
    
    const nodes: Array<DOM_NODE> = (this._virtDOM as VirtDom).getNodes()

    nodes.forEach(node => {
      
      const root: HTMLElement | null = node.owner && node.owner.root ? node.owner.root : this._root
      if (node.isComponent) {
        (node.componentLink as Component).render(root)
        node.root = (node.componentLink as Component).rootOut
      } else {
        const element: HTMLElement = document.createElement(node.tagName)
        
        Object.keys(node.props).forEach(prop => {
          //console.log(prop, node.props)
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

//   // getContent() {
//   //   return this.element
//   // }

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

//   // _createDocumentElement(tagName) {
//   //   // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//   //   return document.createElement(tagName)
//   // }

//   // show() {
//   //   this._element.style.display = 'block'
//   // }

//   // hide() {
//   //   this._element.style.display = 'none'
//   // }
}

// PP \\
export default Component
// PP //