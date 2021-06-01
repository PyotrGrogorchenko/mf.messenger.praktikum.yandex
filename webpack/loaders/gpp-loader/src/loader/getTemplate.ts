export const getTemplate = (props: LooseObject) => {
  const { source } = props
  const tmplIndex = source.indexOf('template()')
  if (tmplIndex < 0) return
  const tmplFunc: string = source.slice(tmplIndex).replace(/\n/g, '')
  const tmplRG = new RegExp(/[`](.*?)[`]/g).exec(tmplFunc)
  if (!tmplRG) return
  props.tmpl = tmplRG[1]
}
