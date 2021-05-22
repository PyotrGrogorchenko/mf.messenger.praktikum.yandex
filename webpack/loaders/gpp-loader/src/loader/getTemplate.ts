export const getTemplate = (source: string): string | null => {
  const tmplIndex = source.indexOf('template()')
  if (tmplIndex < 0) return null
  const tmplFunc: string = source.slice(tmplIndex).replace(/\n/g, '')
  const tmplRG = new RegExp(/[`](.*?)[`]/g).exec(tmplFunc)
  if (!tmplRG) return null
  return tmplRG[1]
}
