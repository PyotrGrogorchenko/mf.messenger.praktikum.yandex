import { get, regexpMatchAll } from '../utils'
import { Component } from '../Component'
import { PARSER_TYPES, Node as PARSER_NODE } from '../parser'
import { Node } from './Node'
import {
  isCloseBracket, compare, parent, inc, getTagName
} from './utils'

export class VirtDom {
  private _nodes: Array<Node> = Array<Node>()
  private _parent: (command: string, node: null | Node) => Node | null = parent()
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
      const tagName = getTagName(record.content)
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
    const right = get(context, condition[2], 0)

    const step: string = codeHead[2].trim().replace(begin[1], '')

    const codeTail = code.substring(code.indexOf('{') + 1).trim().split(';').filter((item:string) => item)
      .map((item:string) => item.trim())
    const vars: Array<any> = []
    codeTail.forEach((item: string) => {
      if (item.startsWith('let') || item.startsWith('const')) {
        vars.push(item.substring(item.indexOf(' ')).replace(/ /ig, '').split('='))
      }
    })

    if (!compare(context[iName], sign, right)) {
      while (!isCloseBracket(template) && template.i < template.list.length) {
        template.i++
        template.record = template.list[template.i]
      }
      template.i++
      template.record = template.list[template.i]
      this._compileItem(context, template)
      return
    }

    const iStart = template.i
    for (context[iName]; compare(context[iName], sign, right); context[iName] += inc(step)) {
      vars.forEach((variable: Array<string>) => {
        const paramI: RegExpExecArray = /\[(.)\]/gm.exec(variable[1]) as RegExpExecArray
        context[variable[0]] = get(context, variable[1].substring(0, paramI?.index))[context[paramI[1]]]
      })

      template.i = iStart
      template.i++
      let key = null

      for (template.i; template.i < template.list.length; template.i++) {
        const record = { ...template.list[template.i] }
        template.record = record

        if (record.type === PARSER_TYPES.CODE) {
          if (isCloseBracket(template)) {
            template.i++
            template.record = { ...template.list[template.i] }
            break
          }
          this._compileCode(context, template)
        }

        regexpMatchAll(record.content, this._REGEXP_PARAM).forEach((param: any) => {
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
            key = get(context, paramKey[1], paramKey[1])
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
      ifParam = compare(ifParamL, ifParamCode[1], ifParamR)
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
        } else if (isCloseBracket(template)) {
          break
        } else if (ifParam) {
          this._compileCode(context, template)
        } else {
          while (!isCloseBracket(template) && template.i < template.list.length) {
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

  _code__calculateValue(context: LooseObject, code: string): any {
    if (code === 'null') {
      return null
    }

    let value: any
    const rgValue: RegExpExecArray | null = new RegExp(this._REGEXP_PARAM).exec(code)
    if (rgValue) {
      value = get(context, rgValue[1], rgValue[1])
    } else {
      value = code
    }

    if (value) {
      regexpMatchAll(value, /['"](.*?)['"]/gi).forEach((rgExe: RegExpExecArray) => {
        value = rgExe[1]
      })
    }

    return value
  }

  _getHeaderProps(context: LooseObject, template: LooseObject, tagName: string): any {
    let { content } = template.record
    const nodeProps: any = {}

    const prefixCache = '#textCache'
    const cacheTxt: LooseObject = {}
    let count: number = 1
    regexpMatchAll(content, /['"](.*?)['"]/gi).forEach((txt: RegExpExecArray) => {
      if (txt[0]) {
        cacheTxt[`${prefixCache}${count}`] = txt[0].substr(1, txt[0].length - 2)
        content = content.replace(txt[0], `${prefixCache}${count}`)
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
        const strClasses: string = param ? get(context, param[1], '') : arrKeyValue[1].replace(/['"]/g, '').trim()
        if (strClasses) {
          nodeProps.classes = strClasses.split(' ')
        }
      } else if (arrKeyValue.length === 1) {
        nodeProps[arrKeyValue[0]] = '#noValue'
      } else if (param) {
        if (param[1].startsWith(prefixCache)) {
          nodeProps[arrKeyValue[0]] = cacheTxt[param[1]]
        } else {
          nodeProps[arrKeyValue[0]] = get(context, param[1], param[1])
        }
      } else {
        nodeProps[arrKeyValue[0]] = arrKeyValue[1].replace(/['"]/g, '')
      }
    })

    return nodeProps
  }

  _closeTag(): void {
    this._parent('remove', null)
  }

  _setNodesDeleteMark() {
    this._nodes.forEach((node) => {
      node.deleteMark = true
    })
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
      }
    }
    return null
  }

  getDeleteMarkedNodes() {
    this._nodes.forEach((node) => {
      if (node.isComponent && node.componentLink) {
        (node.componentLink as Component).virtDOM?.getDeleteMarkedNodes()
      }
      this._nodes = this._nodes.filter((item:Node) => !item.deleteMark)
    })
  }

  /* eslint-disable no-console */
  printNodes() {
    console.log('////////////////////////////////////////////////')
    this._nodes.forEach((node: Node) => {
      console.log(node.deleteMark, node)
    })
  }
  /* eslint-enable no-console */
}
