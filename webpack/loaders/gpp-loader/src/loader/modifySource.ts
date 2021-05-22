import { LooseObject } from '../types'

export const modifySource = (source: string, components: string[], componentsPath: LooseObject) => {
  let componentsImport = '//#gpp-loader #importComponents\\\\'
  let componentsfunc = ''
  components.forEach((component) => {
    componentsImport += `\nimport {${component}} from '${componentsPath[component]}'`
    componentsfunc += (componentsfunc === '' ? '' : ',') + component
  })
  componentsImport += '\n//#gpp-loader #importComponents//\n'
  componentsfunc = `//#gpp-loader #componentsfunc\\\\\ncomponents() {return {${componentsfunc}}}\n//#gpp-loader #componentsfunc//`

  let res = source
  res = componentsImport.concat(res)
  res = res.replace('template()', `${componentsfunc}\ntemplate()`)
  return res
}
