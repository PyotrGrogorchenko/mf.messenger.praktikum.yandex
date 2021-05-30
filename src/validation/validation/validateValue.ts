import { patterns } from '../const'
import { FieldTypes } from '../types'

export const validateValue = (
  type: FieldTypes, val: string, required: boolean = true
): boolean => (!required && !val) || new RegExp(patterns[type].pattern).test(val)
