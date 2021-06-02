import { readChats } from '@chatsController'
import { deleteChat as deleteChatXhr } from '@xhr'
import { selectCerrentId } from './selectots'
import { setCerrentId } from './setters'

export const deleteChat = async () => {
  if (!selectCerrentId()) {
    // eslint-disable-next-line no-alert
    alert('Select a chat, please')
    return
  }
  const res = await deleteChatXhr({ chatId: selectCerrentId() })
  if (res.status !== 200) return
  readChats()
  setCerrentId(0)
}
