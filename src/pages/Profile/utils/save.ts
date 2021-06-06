import { throwError } from '@store'
import { Fields } from '@validation'
import { putProfile } from '@xhr'
import { DataUserProfile } from '@xhrTypes'

export const save = async (fields: Fields) => {
  const data: LooseObject = {}
  Object.keys(fields).forEach(key => {
    data[key] = fields[key].value
  })
  const res = await putProfile(<DataUserProfile>data)
  if (res.status >= 200 && res.status < 300) {
    // eslint-disable-next-line no-alert
    alert('User data is saved')
  } else {
    throwError(res.response.reason, res.status)
    throw new Error(res.response.reason)
  }
}
