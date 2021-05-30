import { State } from '..'

export const clearEvents = () => {
  State.getInstance().clearSubscribes()
}
