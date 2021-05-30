import { Field, FieldTypes } from '../types'

export type Optional = {
  label?: string
  value?: string
  type?: FieldTypes
  valid?: boolean
  required?: boolean
}

export const getField = (name: string, optional: Optional = {}): Field => {
  const field: Field = {
    name,
    label: optional.label ? optional.label : name,
    value: optional.value ? optional.value : '',
    type: optional.type ? optional.type : 'text',
    valid: typeof optional.valid === 'boolean' ? optional.valid : true,
    required: typeof optional.required === 'boolean' ? optional.required : true
  }
  return field
}
