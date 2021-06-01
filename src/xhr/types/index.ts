import {
  DataAuth, DataSignin, DataSignup,
  ResAuth, ResSignin, ResSignup, ResUser, ResLogout
} from './auth'
import { Options } from './common'

import {
  DataChatCreate, DataChats,
  ResChatCreate, ResChats, ResChatsGet,
  Chat
} from './chats'

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Res = ResAuth | ResChats | null
export type Data = DataAuth | DataChats | null
export { Options }

export {
  DataAuth, DataSignin, DataSignup,
  ResAuth, ResSignin, ResSignup, ResUser, ResLogout
}

export {
  DataChatCreate,
  ResChatCreate, ResChatsGet,
  Chat
}
