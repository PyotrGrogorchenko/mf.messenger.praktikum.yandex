import { ResBase } from './common'

// Data
export type DataChatCreate = {
  title: string
}

export type DataChats = DataChatCreate

// Res
export type ResChatCreate = {
  response: {
    id: number
  }
} & ResBase

export type Chat = {
  avatar: string
  created_by: number
  id: number
  last_message: string | null
  title: number
  unread_count: number
}

export type ResChatsGet = {
  response: Chat[]
} & ResBase

export type ResChats = ResChatCreate
