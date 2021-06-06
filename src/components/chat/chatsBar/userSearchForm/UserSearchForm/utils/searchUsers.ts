import { throwError } from '@store'
import { postUserSearch } from '@xhr'
import { ResUserSearch } from '@xhrTypes'

export const searchUsers = async (login: string): Promise<ResUserSearch> => {
  const res = await postUserSearch({ login })
  if (res.status !== 200) {
    throwError(res.response.reason, res.status)
    throw Error(res.response.reason)
  }
  return res
}
