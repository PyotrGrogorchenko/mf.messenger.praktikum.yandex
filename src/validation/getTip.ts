import { patterns } from './patterns'
import { FieldTypes } from './types'

export const getTip = (type: FieldTypes): string => {
  const pattern = patterns[type]
  return pattern ? pattern.tip : ''
}
