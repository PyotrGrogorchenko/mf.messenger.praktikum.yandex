import { getUser } from '@xhr'
import { State } from '../state'

export const setUser = async () => {
  const res = await getUser()
  State.getInstance().user = res.response
}

export const initState = async () => {
  await setUser()
}
