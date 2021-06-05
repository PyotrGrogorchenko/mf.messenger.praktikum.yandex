import { selectCerrentId } from '@chatsController'
import { postChatToken } from '@xhr'
import { Socket } from '@socket'
import { throwError } from '@store'
import { setSocket } from './setters'

export const initSocket = async (): Promise<Socket> => {
  const res = await postChatToken({ chatId: selectCerrentId() })
  if (res.status !== 200) {
    throwError(res.response.reason, res.status)
    throw Error('Request chat token failed')
  }
  const socket = new Socket(res.response.token)
  setSocket(socket)
  return socket
}
