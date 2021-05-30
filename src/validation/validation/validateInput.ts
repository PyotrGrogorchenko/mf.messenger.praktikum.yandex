import { validateField } from '.'
import { Fields } from '../types'

export const validateInput = (fields: Fields, input: HTMLInputElement): Fields => {
  const { id, value } = input
  const field = fields[id]
  field.value = value
  fields[id] = validateField(field)
  return fields
}
