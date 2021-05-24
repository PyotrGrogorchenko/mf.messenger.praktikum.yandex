import { Props } from '../types'
import 'colors'

export const modifySource = (props: Props) => {
  const { components, componentsPath, source } = props
  let componentsImport = '//#gpp-loader #importComponents\\\\'
  let componentsfunc = ''
  const undefinedComponents: string[] = []
  components.forEach((component) => {
    if (!componentsPath[component]) {
      undefinedComponents.push(component)
    } else {
      componentsImport += `\nimport {${component}} from '${componentsPath[component]}'`
      componentsfunc += (componentsfunc === '' ? '' : ',') + component
    }
  })
  componentsImport += '\n//#gpp-loader #importComponents//\n'
  componentsfunc = `//#gpp-loader #componentsfunc\\\\\ncomponents() {return {${componentsfunc}}}\n//#gpp-loader #componentsfunc//`

  let res = source
  res = componentsImport.concat(res)
  res = res.replace('template()', `${componentsfunc}\ntemplate()`)

  if (undefinedComponents.length) {
    const list = undefinedComponents.reduce((prev: string, current: string) => `${prev}${prev ? ', ' : ''}${current}`)
    props.messages.errors.push(`${'Undefined components'.red}: ${list}`)
  }

  props.source = res
}
