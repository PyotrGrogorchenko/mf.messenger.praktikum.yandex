import { readChats } from '@chatsController'
import { deleteChat as deleteChatXhr } from '@xhr'
import { getCerrentId } from './getters'

export const deleteChat = async () => {
  if (!getCerrentId()) {
    // eslint-disable-next-line no-alert
    alert('Select a chat, please')
    return
  }
  const res = await deleteChatXhr({ chatId: getCerrentId() })
  if (res.status !== 200) return
  readChats()
}
