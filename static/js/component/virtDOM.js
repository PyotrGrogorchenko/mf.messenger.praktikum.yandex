import { PARSER_TYPES } from './parser.js'

class VirtDom {
  constructor() {
    
    this._nodes = []
    //this._types = PARSER_TYPES
    this._id = this._func_id()
    this._getOwner = this._func_getOwner() 
    
    this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi
  
  }

  init(parsedTemplate, params) {
  
    parsedTemplate.forEach(item => {

      switch (item.type) {
        case PARSER_TYPES.END:
          this._closeTag()
          break
        case PARSER_TYPES.TEXT:
          this._addNode(item.content, item.type, params)
          break
        case PARSER_TYPES.BEGIN:
          this._addNode(item.content, item.type, params)
          break
        default:
          throw new Error(`Tree: ошибка при инициализвции дерева для: ${item})`)
      }
    
    })
  }

  getIsComponent() {
    return this._nodes.filter(node => node.isComponent === true)
  }

  getNodes() {
    return this._nodes
  }

  _func_id() {
    let id = -1
    return function() {
      id++
    return id
    }
  }

  _func_getOwner() {
    const ownersStack = []
    return function(command = '', node = null) {
      let res = null
      if (command === 'remove') {
        ownersStack.pop()
      } else if (ownersStack.length > 0){
        res = ownersStack[ownersStack.length - 1]
      }
      
      if (command === 'add') {
        ownersStack.push(node)
      }
      
      return res
    }
  }

  _createNode() {
    return {
      id: null,
      level: null,
      owner: null,
      header: null,
      tagName: null,
      content: null,
      isComponent: false,
      props: {classes: []},
      componentLink: null
    }
  }

  _addNode(header, type, params) {
    
    if (type === PARSER_TYPES.BEGIN) {
      
      let node = this._createNode()
      node.owner = this._getOwner('add', node)
      node.tagName = this._getTagName(header)
      node.isComponent = this._setSignComponent(node.tagName)
      node.header = header
      node.id = this._id()
      this._setLevel(node)
      this._setHeaderProps(node, params)  
      //this._setContentProps(node, params)  
      
      this._nodes.push(node)

    } else if (type === PARSER_TYPES.TEXT) {
      
      let owner = this._getOwner()
      if (owner && !owner.isComponent){
        owner.content = this._setContentProps(header, params)
        let a = 1
      }  
    
    }
  
  }

  _closeTag(node = null){
    this._getOwner('remove')
  }

  _setLevel(node) {
    let level = window.get(node, 'owner.level', -1)
    level++
    
    node.level = level
  }

  _setHeaderProps(node, params) {

    let header = node.header;
    
    // for (let i = 0; i < header.length; i++){
    //   const letter = header[i]
    //   if ()
    // }

    const cacheTxt = {}
    let txt = null
    const regExp = new RegExp(/[\'\"](.*?)[\'\"]/gi)
    let count = 1
    while ((txt = regExp.exec(header))) {
      if (txt[0]) {
        cacheTxt[`text${count}`] = txt[0]
        header = header.replace(txt[0], `text${count}`)
        count++
      }
    }
    console.log(header, cacheTxt)


    header.split(' ').forEach(keyValue => {
      if (!keyValue || keyValue === node.tagName){
        return
      }
      
      const arrKeyValue = keyValue.split('=')
      if (cacheTxt[arrKeyValue[1]]) {
        arrKeyValue[1] = cacheTxt[arrKeyValue[1]]
      }  

      console.log(arrKeyValue)
      const param = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1])



      if (arrKeyValue[0] === 'className') {
        const classes = []
        if (param) {
          window.get(params, param[1], '').split(' ').forEach(item => {
            if (!item) {return}
            classes.push(item)
          })
        } else {
          classes.push(arrKeyValue[1].replace(/"/g, ''))
        }
        node.props.classes = classes
      } else if (param) {
        node.props[arrKeyValue[0]] = eval('params.' + param[1]) 
        //window.get(params, param[1], '')
      } else{
        node.props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '')
      }
    })

  }

  _setContentProps(content, params) {

    if (!content) {
      return content
    }

    let param = null;
    const regExp = new RegExp(this._REGEXP_PARAM)
    while ((param = regExp.exec(content))) {
      if (param[1]) {
        const paramVal = eval('params.' + param[1]) 
        content = content.replace(param[0], paramVal)
      }
    }    

    return content

  }

  _getTagName(header) {
    const begin =  0
    const end =  header.indexOf(' ') === -1 ? header.length : header.indexOf(' ')
    return header.slice(begin, end)
  }

  _setSignComponent (tagName){
    return window.isStartsWithUpper(tagName)
  }

}

export default VirtDom