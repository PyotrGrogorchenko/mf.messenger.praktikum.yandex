import { selectCerrentId } from '@chatsController'
import { putAddChatUser } from '@xhr'

export const addUsers = async (userId: number) => {
  const res = await putAddChatUser({
    chatId: selectCerrentId(),
    users: [userId]
  })
  if (res.status !== 200) throw Error('Request failed')
  // eslint-disable-next-line no-alert
  alert('User added')
}
