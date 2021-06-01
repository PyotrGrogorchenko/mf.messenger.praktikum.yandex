import { EventBus, EventsChatsController as Events } from '@EventsBus'
import { Chat } from '@xhrTypes'

export class ChatsController {
  static __instance: ChatsController
  private _eventBus: EventBus<Events> = new EventBus()
  private _chats: Chat[] = []

  private constructor() {}

  public static getInstance(): ChatsController {
    if (!ChatsController.__instance) {
      ChatsController.__instance = new this()
    }
    return ChatsController.__instance
  }

  subscribe(event: Events, cb: any) {
    this._eventBus.on(event, cb)
  }

  clearSubscribes() {
    this._eventBus.offAll()
  }

  get chats() {return this._chats}
  set chats(value) {
    this._chats = value
    ChatsController.getInstance()._eventBus.emit('FLOW_CHATS', this._chats)
  }
}
