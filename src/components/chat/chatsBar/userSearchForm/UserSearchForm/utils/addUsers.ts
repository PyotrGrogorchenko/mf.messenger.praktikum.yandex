import { selectCerrentId } from '@chatsController'
import { throwError } from '@store'
import { putAddChatUser } from '@xhr'

export const addUsers = async (userId: number) => {
  const res = await putAddChatUser({
    chatId: selectCerrentId(),
    users: [userId]
  })
  if (res.status !== 200) {
    throwError(res.response.reason, res.status)
    throw Error(res.response.reason)
  }
  // eslint-disable-next-line no-alert
  alert('User added')
}
