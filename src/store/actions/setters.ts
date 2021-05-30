import { getUser } from '@xhr'
import { State } from '../state'

export const setUser = async () => {
  const res = await getUser()
  if (res.status >= 200 && res.status < 300) {
    State.getInstance().user = res.response
  } else {
    State.getInstance().user = null
  }
}

export const initState = async () => {
  await setUser()
}
