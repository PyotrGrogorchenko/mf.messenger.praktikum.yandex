import { EventsChatsController } from '@EventsBus'
import { ChatsController } from '../ChatsController'

export const subscribe = (event: EventsChatsController, cb: any) => {
  ChatsController.getInstance().subscribe(event, cb)
}
