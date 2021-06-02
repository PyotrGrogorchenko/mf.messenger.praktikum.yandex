import {
  DataAuth, DataSignin, DataSignup,
  ResAuth, ResSignin, ResSignup, ResUserGet, ResLogout
} from './auth'
import { Options } from './common'

import {
  DataChats, DataChatCreate, DataChatDelete, DataChatAddUsers, DataChatToken,
  ResChats, ResChatCreate, ResChatsGet, ResChatDelete, ResChatAddUsers, ResChatToken,
  Chat
} from './chats'

import {
  DataUser, DataUserSearch,
  ResUser, ResUserSearch,
  User
} from './user'

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Res = null | ResAuth | ResChats | ResUser
export type Data = null | DataAuth | DataChats | DataUser
export { Options }

export {
  DataAuth, DataSignin, DataSignup,
  ResAuth, ResSignin, ResSignup, ResUserGet, ResLogout
}

export {
  DataChatCreate, DataChatDelete, DataChatAddUsers, DataChatToken,
  ResChatCreate, ResChatsGet, ResChatDelete, ResChatAddUsers, ResChatToken,
  Chat
}

export {
  DataUserSearch,
  ResUserSearch,
  User
}
