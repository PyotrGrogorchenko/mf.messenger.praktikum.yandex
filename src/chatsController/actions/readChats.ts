import { getChats } from '@xhr'
import { ChatsController } from '../ChatsController'

export const readChats = async () => {
  const res = await getChats()
  ChatsController.getInstance().chats = res.response
}
