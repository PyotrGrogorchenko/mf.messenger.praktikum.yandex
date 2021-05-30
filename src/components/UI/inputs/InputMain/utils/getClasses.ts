import { Field } from '@validation'

type Clsses = {
  input: string,
  label: string,
  tip: string
}

export const getClasses = (field: Field): Clsses => {
  const valid = field.valid || field.valid === undefined

  const input = ['input-main__input']
  input.push(valid ? 'input_main-border' : 'input_err-border')

  const label = ['input-main__label']
  label.push(valid ? 'c-gy3' : 'c-err')

  const tip = ['input-main__label']
  tip.push(valid ? 'hide' : 'c-err')

  return {
    input: input.join(' '),
    label: label.join(' '),
    tip: tip.join(' ')
  }
}
