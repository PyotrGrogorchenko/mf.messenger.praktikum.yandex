import { ChatsController } from '../ChatsController'
import { setCerrentId, setSocket } from './setters'

export const reset = () => {
  ChatsController.getInstance().clearSubscribes()
  setCerrentId(0)
  setSocket(null)
}
