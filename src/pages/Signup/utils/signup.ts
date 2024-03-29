import { setUser } from '@store'
import { Fields } from '@validation'
import { postSignup } from '@xhr'
import { DataSignup } from '@xhrTypes'

export const signup = async (fields: Fields) => {
  const data: LooseObject = {}
  Object.keys(fields).forEach(key => {
    data[key] = fields[key].value
  })
  const res = await postSignup(<DataSignup>data)
  if (res.status >= 200 && res.status < 300) {
    await setUser()
  } else {
    // eslint-disable-next-line no-alert
    alert(`${res.response.reason}`)
    throw new Error(res.response.reason)
  }
}
