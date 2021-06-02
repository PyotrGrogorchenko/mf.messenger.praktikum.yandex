import { postUserSearch } from '@xhr'
import { ResUserSearch } from '@xhrTypes'

export const searchUsers = async (login: string): Promise<ResUserSearch> => {
  const res = await postUserSearch({ login })
  if (res.status !== 200) throw Error('Request failed')
  return res
}
