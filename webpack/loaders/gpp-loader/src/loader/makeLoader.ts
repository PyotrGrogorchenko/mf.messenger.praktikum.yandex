import { getComponents } from './getComponents'
import { getComponentsPath } from './getComponentsPath'
import { getTemplate } from './getTemplate'
import { modifySource } from './modifySource'
import { LooseObject, This } from '../types'

export const makeLoader = () => {
  let componentsPath: LooseObject

  function loader(this: This, source: string) {
    const { resourcePath } = this
    if (!resourcePath.endsWith('.gpp.ts')) return source

    if (!componentsPath) componentsPath = getComponentsPath.apply(this)
    if (componentsPath === {}) return source

    const tmpl = getTemplate(source)
    if (!tmpl) return source

    const components = getComponents(tmpl)
    if (!components.length) return source

    const res = modifySource(source, components, componentsPath)

    return res
  }

  return loader
}
