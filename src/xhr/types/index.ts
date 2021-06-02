import {
  DataAuth, DataSignin, DataSignup,
  ResAuth, ResSignin, ResSignup, ResUser, ResLogout
} from './auth'
import { Options } from './common'

import {
  DataChatCreate, DataChats, DataChatDelete,
  ResChatCreate, ResChats, ResChatsGet, ResChatDelete,
  Chat
} from './chats'

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Res = ResAuth | ResChats | null
export type Data = DataAuth | DataChats | DataChatDelete | null
export { Options }

export {
  DataAuth, DataSignin, DataSignup,
  ResAuth, ResSignin, ResSignup, ResUser, ResLogout
}

export {
  DataChatCreate, DataChatDelete,
  ResChatCreate, ResChatsGet, ResChatDelete,
  Chat
}
