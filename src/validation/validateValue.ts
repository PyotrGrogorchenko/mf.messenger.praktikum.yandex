import { patterns } from './patterns'
import { FieldTypes } from './types'

export const validateValue = (
  type: FieldTypes, val: string, required: boolean = true
): boolean => (!required && !val) || patterns[type].pattern.test(val)
