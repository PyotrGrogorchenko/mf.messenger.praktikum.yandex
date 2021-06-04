import { Socket } from '@socket'
import { ChatsController } from '../ChatsController'

export const setCerrentId = (id: number) => {
  ChatsController.getInstance().currentId = id
}

export const setSocket = (socket: Socket | null) => {
  ChatsController.getInstance().socket = socket
}
