export const getComponents = (tmpl: string) => {
  const components: string[] = []
  const regExp = new RegExp(/[<][A-Z0-9](.*?)[a-zA-Z0-9][\s>]/g)
  const matchAll = tmpl.matchAll(regExp)
  Array.from(matchAll).forEach((item) => {
    components.push(item[0].slice(1, item[0].length - 1))
  })
  return components
}
