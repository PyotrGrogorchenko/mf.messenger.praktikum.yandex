import { State } from '../state'

export const selectRootComponent = (): any => {
  const state = State.getInstance()
  return state.RootComponent
}
