import { Fields } from '../types'
import { validateField } from './validateField'

type Res = {
  valid: boolean
  fields: Fields
}

export const validateFields = (fields: Fields): Res => {
  let valid = true
  Object.keys(fields).forEach(key => {
    fields[key] = validateField(fields[key])
    valid = valid && fields[key].valid
  })
  return { valid, fields }
}
