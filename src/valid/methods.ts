function validateText(val: string) {
  return val.length > 0
}

function validateLogin(val: string) {
  return /^[a-zA-Z\-_]+$/.test(val)
}

function validateName(val: string) {
  return /^[a-zA-Z\s]+$/.test(val)
}

function validateEmail(val: string) {
  // eslint-disable-next-line max-len
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
}

function validatePhone(val: string) {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val)
}

function validatePassword(val: string) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{4,}$/.test(val)
}

function valueIsValid(type: string, val: string): boolean {
  let res: boolean = true

  switch (type) {
    case 'text':
      res = validateText(val)
      break
    case 'login':
      res = validateLogin(val)
      break
    case 'name':
      res = validateName(val)
      break
    case 'mail':
      res = validateEmail(val)
      break
    case 'phone':
      res = validatePhone(val)
      break
    case 'password':
      res = validatePassword(val)
      break
    default:
      break
  }

  return res
}

export { valueIsValid }
