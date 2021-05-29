import { validateValue, FieldTypes } from '@validation'

type Field = {
  name: string
  value: string
  type: FieldTypes
  valid: boolean
}

type Data = {
  [key: string]: Field
}

type Form = {
  valid: boolean
  data: Data
}

type Result = {
  [key: string]: Form
}

export const readForm = (): Result => {
  const res: Result = {}

  const { forms } = document
  for (let i = 0; i < forms.length; i++) {
    const form = forms[i]
    const inputs = form.getElementsByTagName('input')
    const data: Data = {}
    let valid = true
    for (let j = 0; j < inputs.length; j++) {
      const input = inputs[j]
      const { id, value } = input
      const type = (input.type || 'text') as FieldTypes
      const fieldIsValid = validateValue(type, value)
      data[id] = {
        name: id, value, type, valid: fieldIsValid
      }
      valid = valid && fieldIsValid
    }

    const formName = form.getAttribute('formName') || form.getAttribute('id') || String(i)
    res[formName] = {
      valid,
      data
    }
  }

  return res
}
