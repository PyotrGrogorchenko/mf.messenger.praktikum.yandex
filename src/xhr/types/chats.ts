import { ResBase } from './common'

// Data
export type DataChatCreate = {
  title: string
}

export type DataChats = DataChatCreate

export type DataChatDelete = {
  chatId: number
}

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

export type ResChatDelete = {
  response: {
    result: {
      id: number,
      title: string,
      avatar: string | null,
      created_by: number
    }
  }
} & ResBase

export type ResChatsGet = {
  response: Chat[]
} & ResBase

export type ResChats = ResChatCreate | ResChatDelete
