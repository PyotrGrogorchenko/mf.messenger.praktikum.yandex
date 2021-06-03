import { Socket } from '@Socket'
import { ChatsController } from '../ChatsController'

export const setCerrentId = (id: number) => {
  ChatsController.getInstance().currentId = id
}

export const setSocket = (socket: Socket) => {
  ChatsController.getInstance().socket = socket
}
