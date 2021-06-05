import { User } from '@xhrTypes'
import { State } from '../state'
import { Err } from '../types'

export const selectUser = (): User | null => {
  const state = State.getInstance()
  return state.user
}

export const selectAuth = (): boolean => {
  const state = State.getInstance()
  return !!state.user
}

export const selectErr = (): Err => {
  const state = State.getInstance()
  return state.err
}
