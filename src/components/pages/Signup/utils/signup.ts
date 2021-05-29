import { readForm } from '@utils'
import { postSignup } from '@xhr'
import { DataSignup } from '@xhrTypes'

export const signup = async () => {
  const formData = readForm()
  const { data } = formData.userData

  const fields: LooseObject = {}
  Object.keys(data).forEach(key => {
    fields[key] = data[key].value
  })
  const res = await postSignup(<DataSignup>fields)
  console.log('res', res)
  console.log('res', res.status, res.response.id, res.response.error, res.response.reason)
}
