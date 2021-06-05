import { Fields } from '@validation'
import { postSignin } from '@xhr'
import { DataSignin } from '@xhrTypes'

export const signin = async (fields: Fields) => {
  const data: LooseObject = {}
  Object.keys(fields).forEach(key => {
    data[key] = fields[key].value
  })
  const res = await postSignin(<DataSignin>data)
  if (res.status >= 200 && res.status < 300) {
    // redirect
  } else {
    // eslint-disable-next-line no-alert
    alert(`${res.response.reason}`)
    throw new Error(res.response.reason)
  }
}
