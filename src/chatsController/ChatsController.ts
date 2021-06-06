import { EventBus, EventsChatsController as Events } from '@eventsBus'
import { Socket } from '@socket'
import { Chat } from '@xhrTypes'

export class ChatsController {
  static __instance: ChatsController
  private _eventBus: EventBus<Events> = new EventBus()
  private _chats: Chat[] = []
  private _currentId: number = 0
  private _socket: Socket | null = null

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
    this._eventBus.emit('FLOW_CHATS', this._chats)
  }

  get currentId() {return this._currentId}
  set currentId(value) {
    this._currentId = Number(value)
    this._eventBus.emit('FLOW_CURRENT_ID', this._currentId)
  }

  get socket() {return this._socket}
  set socket(value) {
    this._socket = value
    if (this._socket) {
      this._socket.onMessage = this.onMessage
      this._socket.onOpen = this.onOpen
    }
  }

  onMessage = (e: MessageEvent<any>) => {
    this._eventBus.emit('FLOW_SOCKET_MESSAGE', e.data)
  }

  onOpen = () => {
    this._eventBus.emit('FLOW_SOCKET_OPEN', this._socket)
  }
}
