import {
  DataUserSearch,
  ResUserSearch
} from '../types'
import { HTTPTransport } from '../HTTPTransport'
import { User } from '../const'
import 'regenerator-runtime/runtime'

export const postUserSearch = async (data: DataUserSearch): Promise<ResUserSearch> => {
  try {
    return await HTTPTransport.getInstance().exe<DataUserSearch, ResUserSearch>('POST', User.search, { data })
  } catch (err) {
    throw new Error(err)
  }
}
