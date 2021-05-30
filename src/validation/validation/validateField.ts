import { Field } from '../types'
import { validateValue } from './validateValue'

export const validateField = (field: Field): Field => {
  field.valid = validateValue(field.type, field.value)
  return field
}
