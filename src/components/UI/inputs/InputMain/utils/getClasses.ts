import { Field } from '@validation'

type Clsses = {
  input: string,
  label: string,
  tip: string
}

export const getClasses = (field: Field): Clsses => {
  const input = ['input-main__input']
  input.push(field.valid ? 'input_main-border' : 'input_err-border')

  const label = ['input-main__label']
  label.push(field.valid ? 'c-gy3' : 'c-err')

  const tip = ['input-main__label']
  tip.push(field.valid ? 'hide' : 'c-err')

  return {
    input: input.join(' '),
    label: label.join(' '),
    tip: tip.join(' ')
  }
}
