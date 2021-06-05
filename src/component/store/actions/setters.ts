import { State } from '../state'

export const setRootComponent = (RootComponent: any) => {
  State.getInstance().RootComponent = RootComponent
}
