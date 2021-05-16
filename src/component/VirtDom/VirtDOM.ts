import Component from '../Component'
import { PARSER_TYPES, Node as PARSER_NODE } from '../parser'
import { Node } from './Node'

class VirtDom {
  private _nodes: Array<Node> = Array<Node>()
  private _parent: (command: string, node: null | Node) => Node | null = this._func_parent()
  private _REGEXP_PARAM: RegExp = /\{\{(.*?)\}\}/gi
  private _deleteMark: boolean = false

  get deleteMark() {return this._deleteMark}
  set deleteMark(value) {this._deleteMark = value}

  compile(parsedTemplate: Array<PARSER_NODE>, state: any, props: any, _deleteMark: boolean): void {
    this.deleteMark = _deleteMark

    this._setNodesDeleteMark()
    this._compileTemplate(parsedTemplate, state, props)
  }

  _compileTemplate(parsedTemplate: Array<PARSER_NODE>, state: any, props: any): void {
    const context: LooseObject = { state, props }
    const template: LooseObject = { list: parsedTemplate, record: null, i: 0 }

    for (template.i = 0; template.i < template.list.length; template.i++) {
      template.record = template.list[template.i]

      if (template.record.type === PARSER_TYPES.CODE) {
        this._compileCode(context, template)
      } else {
        this._compileItem(context, template)
      }
    }
  }

  _compileItem(context: LooseObject, template: LooseObject) {
    switch (template.record.type) {
      case PARSER_TYPES.END:
        this._closeTag()
        break
      case PARSER_TYPES.TEXT:
        this._compileItem_process(context, template)
        break
      case PARSER_TYPES.BEGIN:
        this._compileItem_process(context, template)
        break
      default:
        throw new Error(`Tree: error initializing the tree for: ${template.record.type} ${template.record.content}`)
    }
  }

  _compileItem_process(context: LooseObject, template: LooseObject): void {
    const { record } = template

    if (record.type === PARSER_TYPES.BEGIN) {
      const tagName = this._getTagName(record.content)
      const newProps = this._getHeaderProps(context, template, tagName)

      let node: Node | null = this.getNodeByUidKey(record.uid, newProps.key) as Node

      if (node) {
        node.setChangedProps(newProps, node.props)

        node.tagName = tagName
        node.props = newProps
        node.deleteMark = this.deleteMark || record.deleteMark
      } else {
        if (this.deleteMark || record.deleteMark) {
          return
        }

        node = new Node()
        this._nodes.push(node)

        node.tagName = tagName
        node.props = newProps

        node.header = record.content
        node.uid = record.uid
        node.key = newProps.key ? newProps.key : ''

        node.setLevel()
        node.setSignComponent()
        node.setChangedProps(node.props)
      }

      node.parent = this._parent('add', node)
    } else if (record.type === PARSER_TYPES.TEXT) {
      const owner: Node | null = this._parent('', null)
      if (owner && !owner.isComponent) {
        owner.setContentProps(context, template)
      }
    }
  }

  _compileCode(context: LooseObject, template: LooseObject) {
    this._compileCode__cycle_for(context, template)
    this._compileCode__if(context, template)
  }

  _compileCode__cycle_for(context: LooseObject, template: LooseObject) {
    const code: string = template.record.content.slice(2, template.record.content.indexOf('%}')).trim()
    if (!code.startsWith('for')) return

    const codeHead = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(';')

    const begin:Array<string> = codeHead[0].trim().split(' ').filter((item:string) => item)
    const iName = begin[1]
    context[iName] = Number(begin[3])

    const condition:Array<string> = codeHead[1].trim().split(' ').filter((item:string) => item)
    const sign = condition[1]
    const right = window.get(context, condition[2], 0)

    const step: string = codeHead[2].trim().replace(begin[1], '')

    const codeTail = code.substring(code.indexOf('{') + 1).trim().split(';').filter((item:string) => item)
      .map((item:string) => item.trim())
    const vars: Array<any> = []
    codeTail.forEach((item: string) => {
      if (item.startsWith('let') || item.startsWith('const')) {
        vars.push(item.substring(item.indexOf(' ')).replace(/ /ig, '').split('='))
      }
    })

    if (!this._compare(context[iName], sign, right)) {
      while (!this._code__isCloseBracket(template) && template.i < template.list.length) {
        template.i++
        template.record = template.list[template.i]
      }
      template.i++
      template.record = template.list[template.i]
      this._compileItem(context, template)
      return
    }

    const iStart = template.i
    for (context[iName]; this._compare(context[iName], sign, right); context[iName] = context[iName] + this._inc(step)) {
      vars.forEach((variable: Array<string>) => {
        const param_i: RegExpExecArray = /\[(.)\]/gm.exec(variable[1]) as RegExpExecArray
        context[variable[0]] = window.get(context, variable[1].substring(0, param_i?.index))[context[param_i[1]]]
      })

      template.i = iStart
      template.i++
      let key = null

      for (template.i; template.i < template.list.length; template.i++) {
        const record = { ...template.list[template.i] }
        template.record = record

        if (record.type === PARSER_TYPES.CODE) {
          if (this._code__isCloseBracket(template)) {
            template.i++
            template.record = { ...template.list[template.i] }
            break
          }
          this._compileCode(context, template)
        }

        window.regexpMatchAll(record.content, this._REGEXP_PARAM).forEach((param: any) => {
          vars.forEach((variable: Array<string>) => {
            if (param[1] && param[1].startsWith(variable[0])) {
              context.state[variable[0]] = context[variable[0]]
              record.content = record.content.replace(param[0], `{{state.${param[1]}}}`)
            }
          })
        })

        // key \\
        if (record.type === PARSER_TYPES.BEGIN) {
          const keyIndex = record.content.indexOf('key')
          if (keyIndex > 0) {
            const paramKey = new RegExp(this._REGEXP_PARAM).exec(record.content.substring(keyIndex)) as RegExpExecArray
            key = window.get(context, paramKey[1], paramKey[1])
            record.content = record.content.replace(new RegExp(paramKey[0], 'g'), key)
          } else {
            record.content += ` key=${key}`
          }
        }
        // key //

        this._compileItem(context, template)
      }
    }
  }

  _compileCode__if(context: LooseObject, template: LooseObject) {
    const code: string = template.record.content.slice(2, template.record.content.indexOf('%}')).trim()
    if (!code.startsWith('if')) return

    const isElse = (): boolean => template.record.content.replace(/ /ig, '') === '{%}else{%}'

    // ifParam
    let ifParam = true
    const ifParamCode = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(' ').filter((item:string) => item)
    const ifParamL = this._code__calculateValue(context, ifParamCode[0])
    if (ifParamCode[2]) {
      const ifParamR = this._code__calculateValue(context, ifParamCode[2])
      ifParam = this._compare(ifParamL, ifParamCode[1], ifParamR)
    } else {
      ifParam = ifParamL
    }

    template.i++
    for (template.i; template.i < template.list.length; template.i++) {
      const record = template.list[template.i]
      template.record = record
      if (record.type === PARSER_TYPES.CODE) {
        if (isElse()) {
          ifParam = !ifParam
          continue
        } else if (this._code__isCloseBracket(template)) {
          break
        } else if (ifParam) {
          this._compileCode(context, template)
        } else {
          while (!this._code__isCloseBracket(template) && template.i < template.list.length) {
            template.i++
            template.record = template.list[template.i]
          }
          continue
        }
      }

      record.deleteMark = !ifParam
      if (ifParam) {
        this._compileItem(context, template)
      }
    }
  }

  _code__isCloseBracket(template: LooseObject): boolean {
    return template.record.content.replace(/ /ig, '') === '{%}%}'
  }

  _code__calculateValue(context: LooseObject, code: string): any {
    if (code === 'null') {
      return null
    }

    let value: any
    const rg: RegExpExecArray | null = new RegExp(this._REGEXP_PARAM).exec(code)
    if (rg) {
      value = window.get(context, rg[1], rg[1])
    } else {
      value = code
    }

    if (value) {
      window.regexpMatchAll(value, /[\'\"](.*?)[\'\"]/gi).forEach((rg: RegExpExecArray) => {
        value = rg[1]
      })
    }

    return value
  }

  _getHeaderProps(context: LooseObject, template: LooseObject, tagName: string): any {
    let { content } = template.record

    const node_props: any = {}

    const cacheTxt: LooseObject = {}
    let count: number = 1
    window.regexpMatchAll(content, /[\'\"](.*?)[\'\"]/gi).forEach((txt: RegExpExecArray) => {
      if (txt[0]) {
        cacheTxt[`text${count}`] = txt[0]
        content = content.replace(txt[0], `text${count}`)
        count++
      }
    })

    content.split(' ').forEach((keyValue: string) => {
      if (!keyValue || keyValue === tagName) {
        return
      }

      const arrKeyValue: Array<string> = keyValue.split('=')

      if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
        arrKeyValue[1] = cacheTxt[arrKeyValue[1]]
      }

      const param: RegExpExecArray | null = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1])

      if (arrKeyValue[0] === 'className') {
        const strClasses: string = param ? window.get(context, param[1], '') : arrKeyValue[1].replace(/[\'\"]/g, '').trim()
        if (strClasses) {
          node_props.classes = strClasses.split(' ')
        }
      } else if (arrKeyValue.length === 1) {
        node_props[arrKeyValue[0]] = '#noValue'
      } else if (param) {
        node_props[arrKeyValue[0]] = window.get(context, param[1], param[1])
      } else {
        node_props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '')
      }
    })

    return node_props
  }

  _compare(left: number, sign: string, right: number): boolean {
    switch (sign) {
      case '<': return left < right
      case '<=': return left <= right
      case '>': return left > right
      case '>=': return left >= right
      case '===': return left === right
      case '!==': return left !== right
      default:
        throw new Error('Compare error')
    }
  }

  _inc(step: string): number {
    switch (step) {
      case '++': return 1
      case '--': return -1
      default:
        throw new Error('Step error')
    }
  }

  _closeTag(): void {
    this._parent('remove', null)
  }

  _func_parent(): (command: string, node: null | Node) => Node | null {
    const parentsStack: Array<Node> = Array<Node>()
    return function (command: string = '', node: null | Node = null): Node | null {
      let res: Node | null = null
      if (command === 'remove') {
        parentsStack.pop()
      } else if (parentsStack.length > 0) {
        res = parentsStack[parentsStack.length - 1]
      }

      if (command === 'add') {
        parentsStack.push(node as Node)
      }

      return res
    }
  }

  _setNodesDeleteMark() {
    this._nodes.forEach((node) => {
      node.deleteMark = true
    })
  }

  _getTagName(str: string): string {
    const begin: number = 0
    const end: number = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ')
    return str.slice(begin, end)
  }

  getIsComponent(): Array<Node> {
    return this._nodes.filter(node => node.isComponent === true)
  }

  getNodes(): Array<Node> {
    return this._nodes
  }

  getNodeByUidKey(uid: number, key: string): Node | null {
    for (let i = 0; i < this._nodes.length; i++) {
      const node: Node = this._nodes[i]
      if ((!key && node.uid === uid) || (key && node.key === key && node.uid === uid)) {
        return node
        break
      }
    }
    return null
  }

  deleteMarkedNodes() {
    this._nodes.forEach((node) => {
      if (node.isComponent && node.componentLink) {
        (node.componentLink as Component).virtDOM?.deleteMarkedNodes()
      }
      this._nodes = this._nodes.filter((node:Node) => !node.deleteMark)
    })
  }

  printNodes() {
    console.log('////////////////////////////////////////////////')
    this._nodes.forEach((node: Node) => {
      console.log(node.deleteMark, node)
    })
  }
}

export { VirtDom }
