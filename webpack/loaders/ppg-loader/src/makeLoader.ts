import { getComponentsPath } from './getComponentsPath'
import { LooseObject, This } from './types'

export const makeLoader = () => {
  let componentsPath: LooseObject

  function loader(this: This, source: string) {
    let res = source
    const { resourcePath } = this
    if (resourcePath.endsWith('.ppg.ts')) {
      if (!componentsPath) {
        componentsPath = getComponentsPath.apply(this)
      }
      const tmplIndex = source.indexOf('template()')
      if (tmplIndex < 0) return res
      let tmpl: string = source.slice(tmplIndex).replace(/\n/g, '')
      // @ts-ignore
      tmpl = new RegExp(/[`](.*?)[`]/g).exec(tmpl)[1]
      const components = []
      const regExp = new RegExp(/[<][A-Z0-9](.*?)[a-zA-Z0-9][\s>]/g)

      let txt
      // eslint-disable-next-line no-cond-assign
      while (txt = regExp.exec(tmpl)) {
        const component = txt[0].slice(1, txt[0].length - 1)
        if (components.indexOf(component) === -1) {
          components.push(component)
        }
      }

      if (!components.length) return res

      let componentsImport = '//#ppg-loader #importComponents\\\\'
      let componentsfunc = ''
      components.forEach((component) => {
        componentsImport += `\nimport {${component}} from '${componentsPath[component]}'`
        componentsfunc += (componentsfunc === '' ? '' : ',') + component
      })
      componentsImport += '\n//#ppg-loader #importComponents//\n'
      componentsfunc = `//#ppg-loader #componentsfunc\\\\\ncomponents() {return {${componentsfunc}}}\n//#ppg-loader #componentsfunc//`

      res = componentsImport.concat(res)
      res = res.replace('template()', `${componentsfunc}\ntemplate()`)
    }
    return res
  }

  return loader
}
