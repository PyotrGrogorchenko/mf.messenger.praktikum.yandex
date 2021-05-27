import { Patterns, ValidTypes } from './types'

const patterns: Patterns = {
  text: /.{1,100}/gm,
  name: /^[a-zA-Z\s]+$/,
  phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
  password: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{4,}$/,
  // eslint-disable-next-line max-len
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const valueIsValid = (
  type: ValidTypes, val: string, required: boolean = true
): boolean => (!required && !val) || patterns[type].test(val)
