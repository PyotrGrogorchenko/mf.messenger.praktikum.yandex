import { User } from '@store'
import { Fields, getField } from '@validation'

const getValue = (name: string, user: User | null): string => {
  // @ts-ignore
  const res = user ? user[name] : ''
  return res
}

export const getFields = (user: User | null = null): Fields => {
  const res = {
    login: getField('login', {
      label: 'Login',
      type: 'login',
      value: getValue('login', user)
    }),
    password: getField('password', {
      label: 'Password',
      type: 'password'
    })
  }
  return res
}
