import { ChatsController } from '../ChatsController'

export const sendMessage = (content: string) => {
  if (!content) return
  const { socket } = ChatsController.getInstance()
  socket?.send(content)
}
