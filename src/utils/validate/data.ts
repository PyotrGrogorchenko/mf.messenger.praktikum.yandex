import { valueIsValid } from './methods'

export const getFormData = (): object => {
  let valid = true
  const data: Array<Indexed> = []

  for (const form of document.forms) {
    for (const input of form.getElementsByTagName('input')) {
      const type: string = input.getAttribute('type') as string

      const currInputIsValid:boolean = valueIsValid(type, input.value)
      valid = valid && currInputIsValid

      data.push({
        name: getInputName(input.id),
        type,
        value: input.value,
        valid: currInputIsValid
      })
    }
  }

  return { valid, data }
}

function getInputName(id: string): string {
  return id.slice(6).replace('-', '_')
}
