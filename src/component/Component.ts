import { copyObj } from '@utils'
import { createValidateEvents } from '@valid'
import EventBus from './EventBus'
import { Node as PARSER_NODE, parser } from './parser'
import { VirtDom, Node as DOM_NODE } from './VirtDom/index'
import { onRouteClick } from '../router/events'
import 'regenerator-runtime/runtime'

enum EVENTS {
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_CWU = 'flow:component-will-update',
  FLOW_CWM = 'flow:component-will-mount',
  FLOW_EXECUTE = 'flow:execute',
  FLOW_COMPILE = 'flow:compile',
  FLOW_RENDER = 'flow:render'
}

class Component {
  private _root: HTMLElement | null = null
  private _virtDOM: VirtDom | null = null
  private _props: any = null
  private _rootOut: HTMLElement | null = null
  private _parsedTemplate:Array<PARSER_NODE> | null = null
  private _deleteMark: boolean = false
  private _isNew: boolean = true

  private _componentDidMountExecuted: boolean = false

  eventBus: () => EventBus

  state: any = {}

  constructor(props: any = {}) {
    this._root = null
    const eventBus: EventBus = new EventBus()
    this._props = props
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
  }

  get rootOut(): HTMLElement | null {return this._rootOut}

  get deleteMark() {return this._deleteMark}
  set deleteMark(value) {this._deleteMark = value}

  get parsedTemplate() {return this._parsedTemplate}
  set parsedTemplate(value) {this._parsedTemplate = value}

  get virtDOM() {return this._virtDOM}

  getProps(): any {return this._props}
  setProps(props: any) {this._props = props}

  components(): any {return {}}
  template(): string {return ''}

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_CWU, this._componentWillUpdate.bind(this))
    eventBus.on(EVENTS.FLOW_CWM, this._componentWillMount.bind(this))
    eventBus.on(EVENTS.FLOW_EXECUTE, this._execute.bind(this))
    eventBus.on(EVENTS.FLOW_COMPILE, this._compile.bind(this))
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init(root: HTMLElement | null): void {
    this._root = root
    if (this._isNew) {
      this.eventBus().emit(EVENTS.FLOW_CWM, this.getProps(), this.getProps())
    } else {
      this.eventBus().emit(EVENTS.FLOW_CWU, this.getProps(), this.state)
    }
    this.eventBus().emit(EVENTS.FLOW_EXECUTE)
    if (this._isNew) {
      this.eventBus().emit(EVENTS.FLOW_CDM, this.getProps(), this.state)
    } else {
      this.eventBus().emit(EVENTS.FLOW_CDU, this.getProps(), this.getProps())
    }
    this._isNew = false
  }

  _componentDidMount(props: any = null, state: any = null) {this.componentDidMount(props, state)}
  componentDidMount(props: any = null, state: any = null) { }

  _componentDidUpdate(oldProps: any = null, newProps: any = null) {this.componentDidUpdate(oldProps, newProps)}
  componentDidUpdate(oldProps: any = null, newProps: any = null) { }

  _componentWillUpdate(props: any = null, state: any = null) {this.componentWillUpdate(props, state)}
  componentWillUpdate(props: any = null, state: any = null) { }

  _componentWillMount(props: any = null, state: any = null) {this.componentWillMount(props, state)}
  componentWillMount(props: any = null, state: any = null) { }

  _execute(modifyState:LooseObject = {}) {
    this.execute(modifyState)
    this.eventBus().emit(EVENTS.FLOW_COMPILE, modifyState)
  }
  execute(modifyState:LooseObject = {}): void {}

  _compile(modifyState: LooseObject = {}) {
    this.compile(modifyState)
    this.eventBus().emit(EVENTS.FLOW_RENDER, modifyState)
  }
  compile(modifyState: LooseObject = {}) {
    Object.assign(this.state, modifyState)

    // console.log('compile')
    let { parsedTemplate } = this
    if (!parsedTemplate) {
      parsedTemplate = parser(this.template())
      this.parsedTemplate = parsedTemplate
    }

    const components: any = this.components()
    const props: any = this.getProps()

    this._virtDOM = !this._virtDOM ? new VirtDom() : this._virtDOM
    this._virtDOM.compile(parsedTemplate as Array<PARSER_NODE>, this.state, props, this.deleteMark)

    this._virtDOM.getIsComponent().forEach((node) => {
      if (node.componentLink) {
        node.componentLink.setProps(node.props)
      } else {
        node.componentLink = new components[node.tagName](node.props);
      }
      (node.componentLink as Component).deleteMark = node.deleteMark
    })
  }

  _render() {
    this.render()
  }
  render() {
    const nodes: Array<DOM_NODE> = (this._virtDOM as VirtDom).getNodes()

    nodes.forEach(node => {
      const root: HTMLElement | null = node.parent && node.parent.root ? node.parent.root : this._root
      if (node.isComponent) {
        (node.componentLink as Component).init(root)
        node.root = (node.componentLink as Component).rootOut
      } else {
        if (node.element) {
          if (node.deleteMark) {
            node.element.remove()
            node.element = null
          }
        } else {
          if (node.deleteMark) {
            return
          }
          node.element = document.createElement(node.tagName) as HTMLElement
        }

        const element: HTMLElement = node.element as HTMLElement

        node.changedProps.forEach(prop => {
          if (prop === 'classes') {
            (node.props.classes as Array<string>).forEach(nodeClass => {
              element.classList.add(nodeClass)
            })
          } else if (typeof node.props[prop] === 'function') {
            if (prop.startsWith('on')) {
              element.addEventListener(prop.slice(2).toLowerCase(), node.props[prop])
            } else {
              element.setAttribute(prop, node.props[prop])
            }
          } else if ((prop === 'href')) {
            if (!node.props[prop]) {
              return
            }
            if (node.props[prop].startsWith('#{R}')) {
              element.addEventListener('click', onRouteClick)
            }
            element.setAttribute(prop, node.props[prop])
          } else if (node.props[prop] === '#noValue') {
            // No actions
          } else {
            element.setAttribute(prop, node.props[prop])
          }
        })
        node.changedProps = []

        if (node.textContentIsChanged) {
          element.textContent = node.textContent
          node.textContentIsChanged = false
        }

        if (node.isNew) {
          (root as HTMLElement).appendChild(element)
          this._rootOut = element
          node.root = element
          element.setAttribute('uid', String(node.uid))
        }
      }

      node.isNew = false
    })
  }

  setState(modifyState: LooseObject) {
    const oldProps = copyObj(this.getProps())
    this.eventBus().emit(EVENTS.FLOW_CWU, this.getProps(), this.state)
    this.eventBus().emit(EVENTS.FLOW_EXECUTE, modifyState)
    this.eventBus().emit(EVENTS.FLOW_CDU, oldProps, this.getProps())
    if (modifyState) {
      this.virtDOM?.deleteMarkedNodes()
    }
    createValidateEvents()
  }
}

export default Component
