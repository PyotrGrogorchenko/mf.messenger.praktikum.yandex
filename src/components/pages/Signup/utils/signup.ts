import { getFormData } from '@utils'
import { xhrSignup } from '@xhr'
import { DataSignup } from '@xhrTypes'
// import 'regenerator-runtime/runtime'

export const signup = async () => {
  const formData = getFormData()
  const { data } = formData.userData

  const fields: LooseObject = {}
  Object.keys(data).forEach(key => {
    fields[key] = data[key].value
  })
  const res = await xhrSignup(<DataSignup>fields)
  console.log('res', res)
  console.log('res', res.status, res.response.id, res.response.error, res.response.reason)
}
