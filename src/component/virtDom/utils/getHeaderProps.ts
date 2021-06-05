import { get, regexpMatchAll } from '@utils'
import { regExpParam } from '../constsnts'

export const getHeaderProps = (context: LooseObject, template: LooseObject, tagName: string): any => {
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

    const param: RegExpExecArray | null = new RegExp(regExpParam).exec(arrKeyValue[1])

    if (arrKeyValue[0] === 'className') {
      const strClasses: string = (param ? get(context, param[1], '') : arrKeyValue[1].replace(/['"]/g, '')).trim()
      if (strClasses) {
        nodeProps.classes = strClasses.split(' ')
      }
    } else if (arrKeyValue.length === 1) {
      nodeProps[arrKeyValue[0]] = '#noValue'
    } else if (param) {
      if (param[1].startsWith(prefixCache)) {
        nodeProps[arrKeyValue[0]] = cacheTxt[param[1]]
      } else {
        nodeProps[arrKeyValue[0]] = get(context, param[1], '')
      }
    } else {
      nodeProps[arrKeyValue[0]] = arrKeyValue[1].replace(/['"]/g, '')
    }
  })

  return nodeProps
}
