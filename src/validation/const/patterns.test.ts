import { patterns } from './patterns'

test('patterns: email', () => {
  expect(new RegExp(patterns.email.pattern).test('mail@mail.ru')).toEqual(true)
  expect(new RegExp(patterns.email.pattern).test('mail#mail.ru')).toEqual(false)
})

test('patterns: login', () => {
  expect(new RegExp(patterns.login.pattern).test('correct_login-123')).toEqual(true)
  expect(new RegExp(patterns.login.pattern).test('IncorrectLogin')).toEqual(false)
  expect(new RegExp(patterns.login.pattern).test('inc*rrect_l*gin')).toEqual(false)
})

test('patterns: name', () => {
  expect(new RegExp(patterns.name.pattern).test('correct Name 123 !@#$%')).toEqual(true)
  // eslint-disable-next-line max-len
  expect(new RegExp(patterns.name.pattern).test('IncorrectName IncorrectName IncorrectName IncorrectName IncorrectName IncorrectName IncorrectName IncorrectName IncorrectName IncorrectName')).toEqual(false)
})

test('patterns: password', () => {
  expect(new RegExp(patterns.password.pattern).test('correct Password 123 !@#$%')).toEqual(true)
  // eslint-disable-next-line max-len
  expect(new RegExp(patterns.password.pattern).test('IncorrectPassword IncorrectPassword IncorrectPassword IncorrectPassword IncorrectPassword IncorrectPassword IncorrectPassword IncorrectPassword IncorrectPassword IncorrectPassword')).toEqual(false)
})

test('patterns: text', () => {
  expect(new RegExp(patterns.text.pattern).test('correct Text 123 !@#$%')).toEqual(true)
  // eslint-disable-next-line max-len
  expect(new RegExp(patterns.text.pattern).test('IncorrectNext IncorrectNext IncorrectNext IncorrectNext IncorrectNext IncorrectNext IncorrectNext IncorrectNext IncorrectNext IncorrectNext IncorrectNext')).toEqual(false)
})

test('patterns: phone', () => {
  expect(new RegExp(patterns.phone.pattern).test('+79261234567')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('89261234567')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('79261234567')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('+7 926 123 45 67')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('8(926)123-45-67')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('123-45-67')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('9261234567')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('(495)1234567')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('(495) 123 45 67')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('89261234567')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('8-926-123-45-67')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('8 927 1234 234')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('8 927 12 12 888')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('8 927 12 555 12')).toEqual(true)
  expect(new RegExp(patterns.phone.pattern).test('8 927 123 8 123')).toEqual(true)

  expect(new RegExp(patterns.phone.pattern).test('++79261234567')).toEqual(false)
  expect(new RegExp(patterns.phone.pattern).test('892612a4567')).toEqual(false)
  expect(new RegExp(patterns.phone.pattern).test('792612345670000')).toEqual(false)
})
