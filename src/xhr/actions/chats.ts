import {
  DataChatCreate,
  ResChatCreate, ResChatsGet
} from '../types'
import { HTTPTransport } from '../HTTPTransport'
import { Chats } from '../const'
import 'regenerator-runtime/runtime'

export const postChatCreate = async (data: DataChatCreate): Promise<ResChatCreate> => {
  try {
    return await HTTPTransport.getInstance().exe<DataChatCreate, ResChatCreate>('POST', Chats.chats, { data })
  } catch (err) {
    throw new Error(err)
  }
}

export const getChats = async (): Promise<ResChatsGet> => {
  try {
    return await HTTPTransport.getInstance().exe<null, ResChatsGet>('GET', Chats.chats)
  } catch (err) {
    throw new Error(err)
  }
}
