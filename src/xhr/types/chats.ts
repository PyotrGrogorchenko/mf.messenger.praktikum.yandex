import { ResBase } from './common'

export type Chat = {
  avatar: string
  created_by: number
  id: number
  last_message: string | null
  title: number
  unread_count: number
}

// create
export type DataChatCreate = {
  title: string
}

export type ResChatCreate = {
  response: {
    id: number
  }
} & ResBase

// delete
export type DataChatDelete = {
  chatId: number
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

// chats get
export type ResChatsGet = {
  response: Chat[]
} & ResBase

// chat put users
export type DataChatAddUsers = {
  chatId: number
  users: number[]
}

export type ResChatAddUsers = ResBase

// token
export type DataChatToken = {
  chatId: number
}

export type ResChatToken = {
  response: {
    token: string
  }
} & ResBase

// common
export type DataChats = DataChatCreate | DataChatDelete | DataChatAddUsers | DataChatToken
export type ResChats = ResChatCreate | ResChatDelete | ResChatAddUsers | ResChatToken
