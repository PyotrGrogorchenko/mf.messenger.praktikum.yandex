import { getChats } from '@chatsController'
import { postChatCreate } from '@xhr'

export const createChat = async (title: string) => {
  const res = await postChatCreate({ title })
  if (res.status !== 200) return
  getChats()
}
