import { setSocket } from '@chatsController'
import { Socket } from '@Socket'
import { postChatToken } from '@xhr'
import { selectCerrentId } from './selectors'

export const initWebSocket = async () => {
  const res = await postChatToken({ chatId: selectCerrentId() })
  if (res.status !== 200) throw Error('Request failed')
  const socket = new Socket(res.response.token)
  setSocket(socket)
}
