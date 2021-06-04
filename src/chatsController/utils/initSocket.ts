import { selectCerrentId } from '@chatsController'
import { postChatToken } from '@xhr'
import { Socket } from '@socket'
import { setSocket } from './setters'

export const initSocket = async () => {
  const res = await postChatToken({ chatId: selectCerrentId() })
  if (res.status !== 200) throw Error('Request chat token failed')
  const socket = new Socket(res.response.token)
  setSocket(socket)
}
