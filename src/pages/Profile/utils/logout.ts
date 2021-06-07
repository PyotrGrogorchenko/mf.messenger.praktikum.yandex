import { resetUser, throwError } from '@store'
import { postLogout } from '@xhr'

export const logout = async () => {
  const res = await postLogout()
  if (res.status >= 200 && res.status < 300) {
    resetUser()
  } else {
    throwError(res.response.reason, res.status)
    throw new Error(res.response.reason)
  }
}
