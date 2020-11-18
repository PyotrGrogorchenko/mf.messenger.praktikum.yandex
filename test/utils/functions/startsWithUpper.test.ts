import { startsWithUpper } from '../../../ts/utils/functions/startsWithUpper'

describe('utils => functions: startsWithUpper', () => {
  
  test('startsWithUpper should return true', () => {
    expect(startsWithUpper('StartsWithUpper')).toBe(true)
  })

  test('startsWithUpper should return false', () => {
    expect(startsWithUpper('startsWithUpper')).toBe(false)
  })

})

