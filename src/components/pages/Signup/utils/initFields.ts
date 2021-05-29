import { getField } from '@validation'

export const initFields = (): LooseObject => ({
  first_name: getField('first_name', { label: 'First name' }),
  second_name: getField('second_name', { label: 'Second name' }),
  login: getField('login', { label: 'Login', type: 'login' }),
  email: getField('email', { type: 'email' }),
  password: getField('password', { label: 'Password', type: 'password' }),
  phone: getField('phone', { label: 'Phone', type: 'phone' })
})
