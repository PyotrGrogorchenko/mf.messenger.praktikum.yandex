import { copyObj } from '../utils'
import EventBus from './EventBus'
import { Node as PARSER_NODE, parser } from '../parser'
import { VirtDom, Node as NodeDom } from '../virtDom'
import { Events } from './Events'

export class Component {
  private _root: HTMLElement | null = null
  private _virtDOM: VirtDom | null = null
  private _props: any = null
  private _rootOut: HTMLElement | null = null
  private _parsedTemplate:Array<PARSER_NODE> | null = null
  private _deleteMark: boolean = false
  private _isNew: boolean = true
  private _isComponent: boolean = true

  private _componentDidMountExecuted: boolean = false

  eventBus: () => EventBus

  state: any = {}

  constructor(props: any = {}) {
    this._root = null
    this._props = props
    const eventBus: EventBus = new EventBus()
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
  }

  get rootOut(): HTMLElement | null {return this._rootOut}

  get deleteMark() {return this._deleteMark}
  set deleteMark(value) {this._deleteMark = value}

  get parsedTemplate() {return this._parsedTemplate}
  set parsedTemplate(value) {this._parsedTemplate = value}

  get virtDOM() {return this._virtDOM}

  get isComponent() {return this._isComponent}

  getProps<P>(): P {return this._props}
  setProps<P>(props: P) {this._props = props}

  /* eslint-disable class-methods-use-this */
  components(): any {return {}}
  template(): string {return ''}
  /* eslint-enable class-methods-use-this */

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Events.FLOW_CWU, this._componentWillUpdate.bind(this))
    eventBus.on(Events.FLOW_CWM, this._componentWillMount.bind(this))
    eventBus.on(Events.FLOW_EXECUTE, this._execute.bind(this))
    eventBus.on(Events.FLOW_COMPILE, this._compile.bind(this))
    eventBus.on(Events.FLOW_RENDER, this._render.bind(this))
  }

  init(root: HTMLElement | null): void {
    this._root = root
    if (this._isNew) {
      this.eventBus().emit(Events.FLOW_CWM, this.getProps(), this.getProps())
    } else {
      this.eventBus().emit(Events.FLOW_CWU, this.getProps(), this.state)
    }
    this.eventBus().emit(Events.FLOW_EXECUTE)
    if (this._isNew) {
      this.eventBus().emit(Events.FLOW_CDM, this.getProps(), this.state)
    } else {
      this.eventBus().emit(Events.FLOW_CDU, this.getProps(), this.getProps())
    }
    this._isNew = false
  }

  /* eslint-disable class-methods-use-this */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  _componentDidMount(props: any = null, state: any = null) {this.componentDidMount(props, state)}
  componentDidMount(_props: any = null, _state: any = null) { }

  _componentDidUpdate(oldProps: any = null, newProps: any = null) {this.componentDidUpdate(oldProps, newProps)}
  componentDidUpdate(_oldProps: any = null, _newProps: any = null) { }

  _componentWillUpdate(props: any = null, state: any = null) {this.componentWillUpdate(props, state)}
  componentWillUpdate(_props: any = null, _state: any = null) { }

  _componentWillMount(props: any = null, state: any = null) {this.componentWillMount(props, state)}
  componentWillMount(_props: any = null, _state: any = null) { }

  _execute(modifyState:LooseObject = {}) {
    this.execute(modifyState)
    this.eventBus().emit(Events.FLOW_COMPILE, modifyState)
  }
  execute(_modifyState:LooseObject = {}): void {}
  /* eslint-enable @typescript-eslint/no-unused-vars */
  /* eslint-enable class-methods-use-this */

  _compile(modifyState: LooseObject = {}) {
    this.compile(modifyState)
    this.eventBus().emit(Events.FLOW_RENDER, modifyState)
  }
  compile(modifyState: LooseObject = {}) {
    Object.assign(this.state, modifyState)

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
      } else if (!components[node.tagName]) {
        // eslint-disable-next-line no-console
        console.error(`${node.tagName} is undefined`)
        throw new Error(`${node.tagName} is undefined`)
      } else {
        node.componentLink = new components[node.tagName](node.props)
      }
      (node.componentLink as Component).deleteMark = node.deleteMark
    })
  }

  _render() {
    this.render()
  }
  render() {
    const nodes: Array<NodeDom> = (this._virtDOM as VirtDom).getNodes()

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
            while (element.classList.length > 0) {
              element.classList.remove(String(element.classList.item(0)))
            }
            (<Array<string>>node.props.classes).forEach(nodeClass => {
              element.classList.add(nodeClass)
            })
          } else if (typeof node.props[prop] === 'function') {
            if (prop.startsWith('on')) {
              element.addEventListener(prop.slice(2).toLowerCase(), node.props[prop])
            } else {
              element.setAttribute(prop, node.props[prop])
            }
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
    this.eventBus().emit(Events.FLOW_CWU, this.getProps(), this.state)
    this.eventBus().emit(Events.FLOW_EXECUTE, modifyState)
    this.eventBus().emit(Events.FLOW_CDU, oldProps, this.getProps())
    if (modifyState) {
      this.virtDOM?.getDeleteMarkedNodes()
    }
    // createValidateEvents()
  }
}
