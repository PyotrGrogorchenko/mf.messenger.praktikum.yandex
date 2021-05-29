import { User } from '../types'
import { State } from '../state'

export const selectUser = (): User | null => {
  const state = State.getInstance()
  return state.user
}
