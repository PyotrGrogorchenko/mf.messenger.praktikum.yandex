import { selectCerrentId } from '@chatsController'
import { postChatToken } from '@xhr'

export const getChatToken = async () => {
  const res = await postChatToken({ chatId: selectCerrentId() })
  if (res.status !== 200) throw Error('Request failed')
  // console.log('res', res.response.token)
}
