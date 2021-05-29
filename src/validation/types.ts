export type FieldTypes = 'text' | 'name' | 'phone' | 'password' | 'email' | 'login'

export type Patterns = {
  [key in FieldTypes]: {
    pattern: RegExp
    tip: string
  }
}

export type Field = {
  name: string
  label: string
  value: string
  type: FieldTypes
  valid: boolean
  required: boolean
}
