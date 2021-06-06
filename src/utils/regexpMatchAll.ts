export const regexpMatchAll = (str: string, TEMPLATE_REGEXP: RegExp): Array<RegExpExecArray> => {
  let key = null
  const res:Array<RegExpExecArray> = []

  // eslint-disable-next-line no-cond-assign
  while ((key = TEMPLATE_REGEXP.exec(str))) {
    res.push(key)
  }

  return res
}
