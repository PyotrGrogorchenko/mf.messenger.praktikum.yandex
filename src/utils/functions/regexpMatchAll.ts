export const regexpMatchAll = (str: string, TEMPLATE_REGEXP: RegExp): Array<RegExpExecArray> => {
  let key = null;
  const res:Array<RegExpExecArray> = []

  // Важно делать exec именно через константу, иначе уйдёте в бесконечный цикл
  while ((key = TEMPLATE_REGEXP.exec(str))) {
    res.push(key)
  }

  return res
}
