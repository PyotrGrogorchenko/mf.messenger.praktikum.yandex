import { ChatsController } from '../ChatsController'

export const setCerrentId = (id: number) => {
  ChatsController.getInstance().currentId = id
}
