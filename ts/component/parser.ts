enum PARSER_TYPES {BEGIN, END, TEXT, CODE}

type Node = {
  type: PARSER_TYPES,
  content: string
}

function parser(str:string): Array<Node> {

  //return parserREGEXP(str) ??? Не получилось найти <tag> с помощью REGEXP, если <tag> в несколтких строках ???
  return parserNoREGEXP(str)
  
}

function parserREGEXP(str: string): Array<Node> {

  const PARSE_REGEXP: RegExp = /\<(.*?)\>/gim
  const strOrigin: string = str
  const res: Array<Node> = Array<Node>()
  
  const addItem = (type: PARSER_TYPES, content: string): void => {
    res.push({type, content})
  }  
  
  let key: null | RegExpExecArray = null
  while ((key = PARSE_REGEXP.exec(strOrigin))) {
    
    //const tagProps = {type: null, content: null}
    const isEndTag: boolean = key[0].startsWith('</')  

    addItem(isEndTag ? PARSER_TYPES.END : PARSER_TYPES.BEGIN, isEndTag ? key[1].slice(1) : key[1])
    str = str.slice(str.indexOf(key[0]) + key[0].length)

    if (!isEndTag) {
      if (str.indexOf('<') >= 0) {
        const content = str.substring(0, str.indexOf('<')).trim()
        if (content){
          addItem(PARSER_TYPES.TEXT, content)
        }
      }
    }

  }

  return res

}

function parserNoREGEXP(str: string): Array<Node> {

  const res: Array<Node> = Array<Node>()

  str = str.replace(/{%/g, '<{%')
  str = str.replace(/%}/g, '%}>')

  const addItem = (type: PARSER_TYPES, content: string): void => {
    res.push({type, content})
  }  
  
  while (str) {
  
    const beginTagPos: number = str.indexOf('<')
    let endTagPos: number = str.indexOf('>')
    
    const isCode: boolean = str.startsWith('<{%')  
    endTagPos = isCode ? str.indexOf('%}>') + 2 : endTagPos

    let tagContent: string = str.slice(beginTagPos + 1, endTagPos).trim()
    tagContent = tagContent.replace(/[\r\n]+/g, '')

    const isEndTag: boolean = tagContent.startsWith('/')  

    if (isCode) {
      addItem(PARSER_TYPES.CODE, tagContent)
    } else {
      addItem(isEndTag ? PARSER_TYPES.END : PARSER_TYPES.BEGIN, isEndTag ? tagContent.slice(1) : tagContent)
    }
      
    str = str.slice(endTagPos + 1).trim()


    //if (!isEndTag) {
      if (str.indexOf('<') >= 0) {
        const content = str.substring(0, str.indexOf('<')).trim()
        if (content){
          addItem(PARSER_TYPES.TEXT, content)
        }
        str = str.slice(str.indexOf('<')).trim()
      }
    //}

  }

  return res

}


export { parser, PARSER_TYPES, Node }