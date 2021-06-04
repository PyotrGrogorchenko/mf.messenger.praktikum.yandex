import { getChats as getChatsXHR } from '@xhr'
import { ChatsController } from '../ChatsController'

export const getChats = async () => {
  const res = await getChatsXHR()
  ChatsController.getInstance().chats = res.response
}
