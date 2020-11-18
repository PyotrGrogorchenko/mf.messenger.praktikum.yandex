import { valueIsValid } from '../../../utils/validate/methods'

describe('utils => validate: valueIsValid', () => {
  
  test('type text', () => {
    expect(valueIsValid('text', 'text')).toBe(true)
    expect(valueIsValid('text', '')).toBe(false)
  })

  test('type login', () => {
    expect(valueIsValid('login', 'login')).toBe(true)
    expect(valueIsValid('login', '')).toBe(false)
    expect(valueIsValid('login', 'login login')).toBe(false)
  })

  test('type name', () => {
    expect(valueIsValid('name', 'name')).toBe(true)
    expect(valueIsValid('name', '')).toBe(false)
    expect(valueIsValid('name', 'name name')).toBe(true)
  })

  test('type mail', () => {
    expect(valueIsValid('mail', 'name')).toBe(false)
    expect(valueIsValid('mail', '')).toBe(false)
    expect(valueIsValid('mail', 'a@a.ru')).toBe(true)
  })

  test('type phone', () => {
    expect(valueIsValid('phone', 'phone')).toBe(false)
    expect(valueIsValid('phone', '')).toBe(false)
    expect(valueIsValid('phone', '123456789')).toBe(false)
    expect(valueIsValid('phone', '(123) 456 7899')).toBe(true)
    expect(valueIsValid('phone', '(123)-456-7899')).toBe(true)
    expect(valueIsValid('phone', '123-456-7899')).toBe(true)
    expect(valueIsValid('phone', '123 456 7899')).toBe(true)
    expect(valueIsValid('phone', '1234567899')).toBe(true)
  })

  test('type password', () => {
    expect(valueIsValid('password', '12346')).toBe(false)
    expect(valueIsValid('password', '')).toBe(false)
    expect(valueIsValid('password', '1Aa')).toBe(false)
    expect(valueIsValid('password', 'Aa')).toBe(false)
    expect(valueIsValid('password', '!1A')).toBe(false)
    expect(valueIsValid('password', '!1Aa')).toBe(true)
  })

})
