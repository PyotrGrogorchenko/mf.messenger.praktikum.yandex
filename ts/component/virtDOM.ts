import { PARSER_TYPES, Node as PARSER_NODE } from './parser'
import Component from './component'
import { strict } from 'assert'
import { stringify } from 'querystring'

enum NODE_ACTION {NEW, UPDATE, NO_ACTION}

class Node {
  
  uid: number = 0
  key: string = ''

  level: number = 0
  owner: null | Node = null
  header: string = ''
  tagName: string = ''
  content: any = ''
  isComponent: boolean = false
  props: any = {}
  componentLink: null | Component = null
  root: null | HTMLElement = null
  action: NODE_ACTION = NODE_ACTION.NEW 

}

class StackItems {

  _stack:Array<PARSER_NODE> = []

  add(item: PARSER_NODE) {
    this._stack.push(item)
  }

  get length() { return this._stack.length }

  getItemByIndex(index: number) {
    return this._stack[index]
  }



}



class VirtDom {
  
  _nodes: Array<Node> = Array<Node>()
  _getOwner: (command: string, node: null | Node) => Node | null  = this._func_getOwner()
  //_isUpdate: () => boolean = !this._nodes
  _currentUid: number = 0
  _REGEXP_PARAM: RegExp = /\{\{(.*?)\}\}/gi

  compile(parsedTemplate: Array<PARSER_NODE>, state: any, props: any): void {
    
    for(let i = 0; i < parsedTemplate.length; i++) {
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

  getNodeByUidKey(uid: Number, key: string): Node | null {
    //console.log('key', key, 'uid', uid)
    
    for (let i = 0; i < this._nodes.length; i++) { 
      let node: Node = this._nodes[i]
      if //((!key && node.uid === uid) || (key && node.key === key && node.uid === uid))
      (node.uid === uid)
        {
        return node
        break 
      }
    }    
    return null
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
        this._addNode(item, state, props)
        break
      case PARSER_TYPES.BEGIN:
        this._addNode(item, state, props)
        break
      default:
        throw new Error(`Tree: error initializing the tree for: ${item.type} ${item.content}`)
    }
    
    //console.log(this._nodes)

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

  _addNode(item: PARSER_NODE, state: any, props: any): void {
    
    //item.content, item.type

    if (item.type === PARSER_TYPES.BEGIN) {

      ////const key = this._getKey(item, props)
      //console.log('item', item.content, 'props', props, 'state', state)
      
      const node_tagName = VirtDom.getTagName(item.content)
      const node_props = this._getHeaderProps(item.content, node_tagName, state, props)  
      

      

      let node: Node | null = this.getNodeByUidKey(item.uid, node_props.key)
      //console.log('foundNode', {...node}, 'item', item, item.uid, node_props.key)
      if (node){
        node.action = NODE_ACTION.NO_ACTION
      }else {
        node = new Node()  
        this._nodes.push(node)
      }

      //let node: Node = new Node()
      node.owner = this._getOwner('add', node)
      node.tagName = node_tagName
      node.isComponent = this._setSignComponent(node.tagName)
      node.header = item.content
      this._setLevel(node)
      node.props = node_props
      //this._setHeaderProps(node, state, props)  
      
      node.uid = item.uid
      
      this._setKey(node)

      // node.key = node.props.key
      // if (!node.key && node.owner) {
      //   node.key = node.owner.props.key
      // }

      

      //console.log(node, 'node_props', node_props)

      

    } else if (item.type === PARSER_TYPES.TEXT) {
      
      let owner: Node | null = this._getOwner('', null)
      if (owner && !owner.isComponent){
        owner.content = this._setContentProps(item.content, state, props)
      }  
    
    }
  
  }

  // _setNodesAction(node: Node, action: NODE_ACTION){
    
  // }

  // _getKey(item: PARSER_NODE, props: any): string{
  //   let content = item.content
  //   console.log('item.content', content, props)
  //   let res: string = ''
  //   if (props.key){
  //     res = props.key
  //   }

  //   return res
  // }

  _compileCode(itemBegin: PARSER_NODE, state: any, props: any, parsedTemplate: Array<PARSER_NODE> , i: any): number {
    
    let code: string = itemBegin.content.slice(2, itemBegin.content.indexOf('%}')).trim() 

    if (code.startsWith('for')) {
      return this._compileCode__cycle_for(itemBegin, state, props, parsedTemplate, i)
    } else if (code.startsWith('if')) {
      return this._compileCode__if(itemBegin, state, props, parsedTemplate, i) 
    } 

    eval(code)
    return i

  }

  _compileCode__cycle_for(itemBegin: PARSER_NODE, state: any, props: any, _parsedTemplate: Array<PARSER_NODE>, i_general: number): number {

    //const $stackItems: StackItems = new StackItems()
    //const $stackItems:Array<PARSER_NODE> = []




    // let items: Array<PARSER_NODE>
    // let param: any 
    // let regExp: RegExp

    const cycleData: LooseObject = {ctx: {}, cycle: {}}
    const ctx = cycleData.ctx
    const cycle = cycleData.cycle

    ctx.state = state
    ctx.props = props

    let code: string = itemBegin.content.slice(2, itemBegin.content.indexOf('%}')).trim() 

    // cycle \\
    cycle.code = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(';')
    
    const begin:Array<string> = cycle.code[0].trim().split(' ').filter((item:string) => item)
    ctx.param_i  = Number(begin[3])

    const condition:Array<string> = cycle.code[1].trim().split(' ').filter((item:string) => item)
    cycle.sign  = condition[1]
    cycle.right = window.get(ctx, condition[2], 0)
    
    let step:string = cycle.code[2].trim()
    step = step.replace(begin[1], '')
    cycle.step       = step
    // cycle //
    
    for ( ctx.param_i ; this._compare(ctx.param_i, cycle.sign, cycle.right); ctx.param_i = ctx.param_i + this._inc(cycle.step) ){
      console.log(ctx.param_i)
    }



    console.log(cycleData)

    i_general++
    // for($i; $i < $parsedTemplate.length; $i++) {
    //   const $item: PARSER_NODE = $parsedTemplate[$i]
    //   if ($item.type === PARSER_TYPES.CODE) {
    //     $code = $code + '\n' + $item.content.slice(2, $item.content.indexOf('%}')).trim() 
    //     break
    //   } 
      
    //   $stackItems.add($item)
    //   //$stackItems.push($item)

    //   $code = $code + '\n' + 
    //   ` 
    //     //item = {...$stackItems[${$stackItems.length - 1}]}
    //     item = {...$stackItems.getItemByIndex(${$stackItems.length - 1})}
      
    //     //if (item.type === PARSER_TYPES.BEGIN) {
    //       console.log('item', {...item}, '$stackItems', {...$stackItems})
    //     //}

    //     window.regexpMatchAll(item.content, this._REGEXP_PARAM).forEach(function(param) {
    //       if (param[1] && !param[1].startsWith('state') && !param[1].startsWith('props')) {
    //         const quote = item.type === PARSER_TYPES.TEXT ? '' : '"'
    //         item.content = item.content.replace(param[0], quote + eval(param[1]) + quote)
    //       }
    //     })`
      
    //   $code = $code + '\n' + `  this._compileItem(item, state, props)`
    
    // }

    // eval($code)

    return i_general

    


    // const $stackItems: StackItems = new StackItems()
    // //const $stackItems:Array<PARSER_NODE> = []


    // let item: PARSER_NODE 
    // let param: any 
    // let regExp: RegExp

    // let $code: string = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim() 

    // $i++
    // for($i; $i < $parsedTemplate.length; $i++) {
    //   const $item: PARSER_NODE = $parsedTemplate[$i]
    //   if ($item.type === PARSER_TYPES.CODE) {
    //     $code = $code + '\n' + $item.content.slice(2, $item.content.indexOf('%}')).trim() 
    //     break
    //   } 
      
    //   $stackItems.add($item)
    //   //$stackItems.push($item)

    //   $code = $code + '\n' + 
    //   ` 
    //     //item = {...$stackItems[${$stackItems.length - 1}]}
    //     item = {...$stackItems.getItemByIndex(${$stackItems.length - 1})}
      
    //     //if (item.type === PARSER_TYPES.BEGIN) {
    //       console.log('item', {...item}, '$stackItems', {...$stackItems})
    //     //}

    //     window.regexpMatchAll(item.content, this._REGEXP_PARAM).forEach(function(param) {
    //       if (param[1] && !param[1].startsWith('state') && !param[1].startsWith('props')) {
    //         const quote = item.type === PARSER_TYPES.TEXT ? '' : '"'
    //         item.content = item.content.replace(param[0], quote + eval(param[1]) + quote)
    //       }
    //     })`
      
    //   $code = $code + '\n' + `  this._compileItem(item, state, props)`
    
    // }

    // eval($code)

    // return $i



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
  
  _compare(left: number, sign: string, right: number): boolean {
    
    switch (sign) {
      case '<': return left < right
      case '<=': return left <= right
      case '>': return left > right
      case '>=': return left >= right
      default:
        throw new Error(`Compare error`)
    }

  }

  _inc(step: string): number {
  
    switch (step) {
      case '++': return 1
      case '--': return -1
      default:
        throw new Error(`Step error`)
    }

  }


  _closeTag(): void{
    this._getOwner('remove', null)
  }

  _setLevel(node: Node) {
    let level: number = window.get(node, 'owner.level', -1)
    level++
    
    node.level = level
  }

  _getHeaderProps(header: string, tagName: string, state: any, props: any): any {

    //let header: string = node.header;
    const node_props: any = {}

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

      if (!keyValue || keyValue === tagName){
        return
      }
      
      const arrKeyValue: Array<string> = keyValue.split('=')
      
      if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
        arrKeyValue[1] = cacheTxt[arrKeyValue[1]]
      }  

      const param: RegExpExecArray | null = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1])

      if (arrKeyValue[0] === 'className') {
        const strClasses: string = param ? window.get(state, props, param[1], '') : arrKeyValue[1].replace(/[\'\"]/g, '')
        node_props.classes = strClasses.split(' ')
      } else if (arrKeyValue.length === 1) {
        node_props[arrKeyValue[0]] = '#noValue'
      } else if (param) {
        node_props[arrKeyValue[0]] = eval(param[1]) 
      } else{
        node_props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '')
      }
    })

    return node_props

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

  _setKey(node: Node): void {
    node.key = node.props.key
    if (!node.key && node.owner) {
      node.key = node.owner.props.key
      if (node.content.indexOf('key=') < 0 ){
        node.header += ' key="' + node.key + '"'
        node.props.key = node.key
      }
    }
  }

}

export { VirtDom, Node, NODE_ACTION}