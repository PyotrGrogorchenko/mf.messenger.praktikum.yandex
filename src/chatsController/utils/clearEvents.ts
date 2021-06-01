import { ChatsController } from '../ChatsController'

export const clearEvents = () => {
  ChatsController.getInstance().clearSubscribes()
}
