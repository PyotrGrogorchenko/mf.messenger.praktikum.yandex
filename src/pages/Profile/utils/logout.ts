import { redirect } from '@router'
import { postLogout } from '@xhr'

export const logout = async () => {
  const res = await postLogout()
  if (res.status >= 200 && res.status < 300) {
    redirect('#signin')
  } else {
    // eslint-disable-next-line no-alert
    alert(`${res.response.reason}`)
  }
}
