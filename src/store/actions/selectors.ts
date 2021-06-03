import { User } from '@xhrTypes'
import { State } from '../state'

export const selectUser = (): User | null => {
  const state = State.getInstance()
  return state.user
}

export const selectAuth = (): boolean => {
  const state = State.getInstance()
  return !!state.user
}
