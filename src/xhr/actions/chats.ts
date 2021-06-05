import { throwError } from '@store'
import {
  DataChatAddUsers, DataChatCreate, DataChatDelete, DataChatToken,
  ResChatAddUsers, ResChatCreate, ResChatDelete, ResChatsGet, ResChatToken
} from '../types'
import { HTTPTransport } from '../HTTPTransport'
import { Chats } from '../const'
import 'regenerator-runtime/runtime'

export const postChatCreate = async (data: DataChatCreate): Promise<ResChatCreate> => {
  try {
    return await HTTPTransport.getInstance().exe<DataChatCreate, ResChatCreate>('POST', Chats.create, { data })
  } catch (err) {
    throwError(err.message)
    throw new Error(err)
  }
}

export const getChats = async (): Promise<ResChatsGet> => {
  try {
    return await HTTPTransport.getInstance().exe<null, ResChatsGet>('GET', Chats.get)
  } catch (err) {
    throwError(err.message)
    throw new Error(err)
  }
}

export const deleteChat = async (data: DataChatDelete): Promise<ResChatDelete> => {
  try {
    return await HTTPTransport.getInstance().exe<DataChatDelete, ResChatDelete>('DELETE', Chats.delete, { data })
  } catch (err) {
    throwError(err.message)
    throw new Error(err)
  }
}

export const putAddChatUser = async (data: DataChatAddUsers): Promise<ResChatAddUsers> => {
  try {
    return await HTTPTransport.getInstance().exe<DataChatAddUsers, ResChatAddUsers>('PUT', Chats.addUsers, { data })
  } catch (err) {
    throwError(err.message)
    throw new Error(err)
  }
}

export const postChatToken = async (data: DataChatToken) => {
  try {
    return await HTTPTransport.getInstance().exe<DataChatToken, ResChatToken>('POST', `${Chats.token}/${data.chatId}`)
  } catch (err) {
    throwError(err.message)
    throw new Error(err)
  }
}
