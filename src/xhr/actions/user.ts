import { throwError } from '@store'
import {
  DataUserProfile, DataUserSearch,
  ResUserProfile, ResUserSearch
} from '../types'
import { HTTPTransport } from '../HTTPTransport'
import { User } from '../const'
import 'regenerator-runtime/runtime'

export const postUserSearch = async (data: DataUserSearch): Promise<ResUserSearch> => {
  try {
    return await HTTPTransport.getInstance().exe<DataUserSearch, ResUserSearch>('POST', User.search, { data })
  } catch (err) {
    throwError(err.message)
    throw new Error(err)
  }
}

export const putProfile = async (data: DataUserProfile): Promise<ResUserProfile> => {
  try {
    return await HTTPTransport.getInstance().exe<DataUserProfile, ResUserProfile>('PUT', User.profile, { data })
  } catch (err) {
    throwError(err.message)
    throw new Error(err)
  }
}
