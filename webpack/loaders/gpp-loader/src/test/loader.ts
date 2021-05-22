// import { getOptions } from 'loader-utils'
import { This } from '../types'

export default function loader(this: This, source: string) {
  // const options = getOptions(this)
  let res = source

  res = res.replace(/\[name\]/g, 'Tapir')

  // return `export default ${JSON.stringify(res)}`
  return res
}
