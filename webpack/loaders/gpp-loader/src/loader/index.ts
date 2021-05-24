import { validate } from 'schema-utils'
import { getOptions } from 'loader-utils'
import { JSONSchema7 } from 'schema-utils/declarations/validate'
import { getComponents } from './getComponents'
import { getComponentsPath } from './getComponentsPath'
import { getTemplate } from './getTemplate'
import { modifySource } from './modifySource'
import { LooseObject, Props, This } from '../types'

import schema from './schema.json'
import { consoleMessages } from './consoleMessages'

export default () => {
  let componentsPath: LooseObject

  function loader(this: This, source: string) {
    const options = getOptions(this)
    validate(schema as JSONSchema7, options, {
      name: 'ppg-loader'
    })

    const { resourcePath } = this
    if (!resourcePath.endsWith('.gpp.ts')) return source

    if (!componentsPath) componentsPath = getComponentsPath.apply(this, [typeof options.componentsDir === 'string' ? options.componentsDir : ''])
    if (componentsPath === {}) return source

    const props: Props = {
      source,
      options,
      resourcePath,
      componentsPath,
      tmpl: '',
      components: [],
      messages: { errors: [], warnings: [] }
    }

    getTemplate(props)
    if (!props.tmpl) return source

    getComponents(props)
    if (!props.components.length) return source

    modifySource(props)

    consoleMessages(props)

    return props.source
  }

  return loader
}
