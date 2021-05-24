import { Props } from 'src/types'

export const getComponents = (props: Props) => {
  const { tmpl } = props
  const components: string[] = []
  const regExp = new RegExp(/[<][A-Z0-9](.*?)[a-zA-Z0-9][\s>]/g)
  const matchAll = tmpl.matchAll(regExp)
  Array.from(matchAll).forEach((item) => {
    const component = item[0].slice(1, item[0].length - 1)
    if (!components.includes(component)) components.push(component)
  })
  props.components = components
}
