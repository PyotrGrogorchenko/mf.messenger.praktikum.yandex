import { User } from '@xhrTypes'
import { Fields, getField } from '@validation'

const getValue = (name: string, user: User | null): string => {
  // @ts-ignore
  const res = user ? user[name] : ''
  return res
}

export const getFields = (user: User | null = null): Fields => {
  const res = {
    display_name: getField('display_name', {
      label: 'First name',
      value: getValue('display_name', user)
    }),
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
    })
  }
  return res
}
