import Component from "../Component"

const _REGEXP_PARAM: RegExp = /\{\{(.*?)\}\}/gi

class Node {
  
  private _isNew: boolean = true
  private _changedProps: Array<string> = []
  private _deleteMark: boolean = false

  uid: number = 0
  key: string = ''

  textContent: string = ''
  textContentIsChanged: boolean = false

  level: number = 0
  parent: null | Node = null
  header: string = ''
  tagName: string = ''
  isComponent: boolean = false
  props: any = {}
  componentLink: null | Component = null
  root: null | HTMLElement = null

  element: HTMLElement | null = null

  get isNew() { return this._isNew }
  set isNew(value) { this._isNew = value }
  
  get changedProps() { return this._changedProps }
  set changedProps(value) { this._changedProps = value }

  get deleteMark() { return this._deleteMark }
  set deleteMark(value) { this._deleteMark = value }
  
  setContentProps(context: LooseObject, template: LooseObject): void {
    const oldTextConent =  this.textContent
    let { content } = template.record
    if (!content) {
      this.textContent = content
      this.textContentIsChanged = false
    }
    window.regexpMatchAll(content, _REGEXP_PARAM).forEach(function(param: RegExpExecArray) {
      if (param[1]) {
        content = content.replace(param[0], window.get(context, param[1], ''))
      }
    })
    this.textContent = content
    this.textContentIsChanged = oldTextConent !== content
  }

  setChangedProps(newProps: any, oldProps: any = null) {
    const res: Array<string> = []
    if (oldProps) {
      for (const key in newProps){
        if (!window.isEqual(oldProps[key], newProps[key])){
          res.push(key)
        }
      }    
    } else {
      for (const key in newProps){
        res.push(key)
      }    
    }
    this.changedProps = res
  }

  setSignComponent (){
    this.isComponent = window.startsWithUpper(this.tagName)
  }

  setLevel() {
    let level: number = window.get(this, 'owner.level', -1)
    level++
    this.level
  }

}

export { Node }