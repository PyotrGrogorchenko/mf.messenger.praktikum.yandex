import { get, regexpMatchAll } from '@utils'
import { regExpParam, primitives } from '../../constsnts'

export const calculateValue = (context: LooseObject, code: string): any => {
  if (primitives[code]) {
    return primitives[code].value
  }

  let value: any
  const rgValue: RegExpExecArray | null = new RegExp(regExpParam).exec(code)
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
