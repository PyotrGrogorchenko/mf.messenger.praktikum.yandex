import { PARSER_TYPES, Node as PARSER_NODE } from './parser'
import Component from './component'

class Node {
  
  uid: number = 0
  level: number = 0
  owner: null | Node = null
  header: string = ''
  tagName: string = ''
  content: any = ''
  isComponent: boolean = false
  props: any = {}
  componentLink: null | Component = null
  root: null | HTMLElement = null

}

class VirtDom {
  
  _nodes: Array<Node> = Array<Node>()
  _getOwner: (command: string, node: null | Node) => Node | null  = this._func_getOwner()
  _REGEXP_PARAM: RegExp = /\{\{(.*?)\}\}/gi

  constructor(parsedTemplate: Array<PARSER_NODE>, state: any, props: any) {
    
    this.init(parsedTemplate, state, props)
  }

  init(parsedTemplate: Array<PARSER_NODE>, state: any, props: any): void {
  
    for(let i: number = 0; i < parsedTemplate.length; i++) {
      const item: PARSER_NODE = parsedTemplate[i]

      if (item.type === PARSER_TYPES.CODE) {
        i = this._compileCode(item, state, props, parsedTemplate, i)
      } else {
        this._compileItem(item, state, props)
      }
      
    }
  }

  getIsComponent(): Array<Node> {
    return this._nodes.filter(node => node.isComponent === true)
  }

  getNodes(): Array<Node> {
    return this._nodes
  }

  static getTagName(str: string): string {
    const begin: number =  0
    const end: number =  str.indexOf(' ') === -1 ? str.length : str.indexOf(' ')
    return str.slice(begin, end)
  }

  _compileItem(item: PARSER_NODE, state: any, props: any) {
  
    switch (item.type) {
      case PARSER_TYPES.END:
        this._closeTag()
        break
      case PARSER_TYPES.TEXT:
        this._addNode(item.content, item.type, state, props)
        break
      case PARSER_TYPES.BEGIN:
        this._addNode(item.content, item.type, state, props)
        break
      default:
        throw new Error(`Tree: ошибка при инициализвции дерева для: ${item.type} ${item.content}`)
    }
    
  }
  
  _func_getOwner(): (command: string , node: null | Node) => Node | null {
    const ownersStack: Array<Node> = Array<Node>() 
    return function(command: string = '', node: null | Node = null): Node | null {
      let res: Node | null = null
      if (command === 'remove') {
        ownersStack.pop()
      } else if (ownersStack.length > 0){
        res = ownersStack[ownersStack.length - 1]
      }
      
      if (command === 'add') {
        ownersStack.push(node as Node)
      }
      
      return res
    }
  }

  _addNode(header: string, type: PARSER_TYPES, state: any, props: any): void {
    
    if (type === PARSER_TYPES.BEGIN) {
      
      //let node = this._createNode()
      let node: Node = new Node()
      node.owner = this._getOwner('add', node)
      node.tagName = VirtDom.getTagName(header)
      node.isComponent = this._setSignComponent(node.tagName)
      node.header = header
      node.uid = window.uid()
      this._setLevel(node)
      this._setHeaderProps(node, state, props)  
      
      this._nodes.push(node)

    } else if (type === PARSER_TYPES.TEXT) {
      
      let owner: Node | null = this._getOwner('', null)
      if (owner && !owner.isComponent){
        owner.content = this._setContentProps(header, state, props)
      }  
    
    }
  
  }

  _compileCode(itemBegin: PARSER_NODE, state: any, props: any, parsedTemplate: Array<PARSER_NODE> , i: any): number {
    
    let code: string = itemBegin.content.slice(2, itemBegin.content.indexOf('%}')).trim() 

    if (code.startsWith('for') || code.startsWith('while')) {
      return this._compileCode__cycle(itemBegin, state, props, parsedTemplate, i)
    } else if (code.startsWith('if')) {
      return this._compileCode__if(itemBegin, state, props, parsedTemplate, i) 
    } 

    eval(code)
    return i

  }

  _compileCode__cycle($itemBegin: PARSER_NODE, state: any, props: any, $parsedTemplate: Array<PARSER_NODE>, $i: number): number {

    const $stackItems:Array<PARSER_NODE> = []

    let item: PARSER_NODE 
    let param: any 
    let regExp: RegExp

    let $code: string = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim() 

    $i++
    for($i; $i < $parsedTemplate.length; $i++) {
      const $item: PARSER_NODE = $parsedTemplate[$i]
      if ($item.type === PARSER_TYPES.CODE) {
        $code = $code + '\n' + $item.content.slice(2, $item.content.indexOf('%}')).trim() 
        break
      } 
      
      $stackItems.push($item)

      $code = $code + '\n' + 
      ` item = {...$stackItems[${$stackItems.length - 1}]}
        
        window.regexpMatchAll(item.content, this._REGEXP_PARAM).forEach(function(param) {
          if (param[1] && !param[1].startsWith('state') && !param[1].startsWith('props')) {
            const quote = item.type === PARSER_TYPES.TEXT ? '' : '"'
            item.content = item.content.replace(param[0], quote + eval(param[1]) + quote)
          }
        })`
      
      $code = $code + '\n' + `  this._compileItem(item, state, props)`
    
    }

    eval($code)

    return $i
  
  }

  _compileCode__if($itemBegin: PARSER_NODE, state: any, props: any, $parsedTemplate: Array<PARSER_NODE>, $i: number): number {

    const $stackItems:Array<PARSER_NODE> = []

    let item: PARSER_NODE 
    let param: any 
    let regExp: RegExp

    let $code: string = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim() 

    $i++
    for($i; $i < $parsedTemplate.length; $i++) {
      const $item = $parsedTemplate[$i]
      if ($item.type === PARSER_TYPES.CODE) {
        const $middleCode = $item.content.slice(2, $item.content.indexOf('%}')).trim() 
        $code = $code + '\n' + $middleCode 
        if ($middleCode.indexOf('else') > 0){
          continue
        }
        break
      } 
      
      $stackItems.push($item)

      $code = $code + '\n' + 
      ` item = $stackItems[${$stackItems.length - 1}]`
      $code = $code + '\n' + `  this._compileItem(item, state, props)`
    
    }

    //console.log($code)
    eval($code)

    return $i
  

  }
  
  _closeTag(): void{
    this._getOwner('remove', null)
  }

  _setLevel(node: Node) {
    let level: number = window.get(node, 'owner.level', -1)
    level++
    
    node.level = level
  }

  _setHeaderProps(node: Node, state: any, props: any): void {

    let header: string = node.header;
    
    const cacheTxt: LooseObject = {}
    let count: number = 1
    window.regexpMatchAll(header, /[\'\"](.*?)[\'\"]/gi).forEach(function(txt: RegExpExecArray) {
      if (txt[0]) {
        cacheTxt[`text${count}`] = txt[0]
        header = header.replace(txt[0], `text${count}`)
        count++
      }
    })

    header.split(' ').forEach(keyValue => {
      if (!keyValue || keyValue === node.tagName){
        return
      }
      
      const arrKeyValue: Array<string> = keyValue.split('=')
      
      if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
        arrKeyValue[1] = cacheTxt[arrKeyValue[1]]
      }  

      const param: RegExpExecArray | null = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1])

      if (arrKeyValue[0] === 'className') {
        const strClasses: string = param ? window.get(state, props, param[1], '') : arrKeyValue[1].replace(/[\'\"]/g, '')
        node.props.classes = strClasses.split(' ')
      } else if (arrKeyValue.length === 1) {
        node.props[arrKeyValue[0]] = '#noValue'
      } else if (param) {
        node.props[arrKeyValue[0]] = eval(param[1]) 
      } else{
        node.props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '')
      }
    })

  }

  _setContentProps(content: string, state: any, props: any): string {

    if (!content) {
      return content
    }

    window.regexpMatchAll(content, this._REGEXP_PARAM).forEach(function(param: RegExpExecArray) {
      if (param[1]) {
        content = content.replace(param[0], eval(param[1]))
      }
    })

    return content

  }

  _setSignComponent (tagName: string){
    return window.startsWithUpper(tagName)
  }

}

export { VirtDom, Node}