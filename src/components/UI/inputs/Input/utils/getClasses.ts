import { Classes, ClassesProps } from '../types'

// font-size_small

export const getClasses = (props: ClassesProps): Classes => {
  const {
    style, fontSize
  } = props

  const valid = props.valid || props.valid === undefined

  const input = ['input-main__input']
  input.push(`font-size_${fontSize || 'small'}`)
  input.push(`input-${style || 'main'}_background`)
  if (!valid) {
    input.push('input-err_border')
  } else {
    input.push(`input-${style || 'main'}_border`)
  }

  const labelClass = ['input__label']
  labelClass.push(valid ? 'c-middle' : 'c-err')

  const tip = ['input__label']
  tip.push(valid ? 'hide' : 'c-err')

  return {
    input: input.join(' '),
    label: labelClass.join(' '),
    tip: tip.join(' ')
  }
}
