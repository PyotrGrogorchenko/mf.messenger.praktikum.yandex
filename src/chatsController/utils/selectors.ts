import { Socket } from '@socket'
import { Chat } from '@xhrTypes'
import { ChatsController } from '../ChatsController'

export const selectCerrentId = (): number => ChatsController.getInstance().currentId

export const selectCerrentChat = (): Chat | null => {
  const controller = ChatsController.getInstance()
  const { currentId, chats } = controller
  if (!currentId) return null
  return chats.filter((chat) => chat.id === currentId)[0]
}

export const selectSocket = (): Socket | null => ChatsController.getInstance().socket
