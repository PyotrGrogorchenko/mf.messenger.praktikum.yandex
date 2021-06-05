import { getUser } from '@xhr'
import { State } from '../state'
import { Err } from '../types'

export const setUser = async () => {
  const res = await getUser()
  if (res.status >= 200 && res.status < 300) {
    State.getInstance().user = res.response
  } else {
    State.getInstance().user = null
  }
}

export const resetUser = () => {
  State.getInstance().user = null
}

export const initState = async () => {
  await setUser()
}

export const setErr = (err: Err | null) => {
  State.getInstance().err = err
}
