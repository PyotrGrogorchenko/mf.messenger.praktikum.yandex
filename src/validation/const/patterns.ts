import { Patterns } from '../types'

export const patterns: Patterns = {
  text: {
    pattern: /.{1,100}/gm,
    tip: 'length 1-100'
  },
  name: {
    pattern: /.{1,100}/gm,
    tip: 'length 1-100'
  },
  login: {
    pattern: /.{1,100}/gm,
    tip: 'length 1-100'
  },
  phone: {
    pattern: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/im,
    tip: '+79261234567, 89261234567, 79261234567'
  },
  password: {
    pattern: /.{1,100}/gm,
    tip: 'length 1-100'
  },
  email: {
    // eslint-disable-next-line max-len
    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    tip: 'example@mail.ru'
  }
}
