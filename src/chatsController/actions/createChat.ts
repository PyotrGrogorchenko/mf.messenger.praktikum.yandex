import { postChatCreate } from '@xhr'

export const createChat = async (title: string) => {
  const res = await postChatCreate({ title })
}
