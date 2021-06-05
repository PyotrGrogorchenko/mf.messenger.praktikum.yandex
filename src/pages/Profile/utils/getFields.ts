import { User } from '@store'
import { Fields, getField } from '@validation'

const getValue = (name: string, user: User | null): string => {
  // @ts-ignore
  const res = user ? user[name] : ''
  return res
}

export const getFields = (user: User | null = null): Fields => {
  const res = {
    first_name: getField('first_name', {
      label: 'First name',
      value: getValue('first_name', user)
    }),
    second_name: getField('second_name', {
      label: 'Second name',
      value: getValue('second_name', user)
    }),
    login: getField('login', {
      label: 'Login',
      type: 'login',
      value: getValue('login', user)
    }),
    email: getField('email', {
      type: 'email',
      value: getValue('email', user)
    }),
    phone: getField('phone', {
      label: 'Phone',
      type: 'phone',
      value: getValue('phone', user)
    }),
    oldPassword: getField('oldPassword', {
      label: 'Old password',
      type: 'password'
    }),
    newPassword: getField('newPassword', {
      label: 'New password',
      type: 'password'
    })
  }
  return res
}
