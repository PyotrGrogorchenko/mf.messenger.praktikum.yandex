import { getChats } from '@chatsController'
import { deleteChat as deleteChatXhr } from '@xhr'
import { selectCerrentId } from './selectors'
import { setCerrentId } from './setters'

export const deleteChat = async () => {
  if (!selectCerrentId()) {
    // eslint-disable-next-line no-alert
    alert('Select a chat, please')
    return
  }
  const res = await deleteChatXhr({ chatId: selectCerrentId() })
  if (res.status !== 200) return
  getChats()
  setCerrentId(0)
}
