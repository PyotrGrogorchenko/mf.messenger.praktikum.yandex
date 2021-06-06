import { selectCerrentId } from '@chatsController'
import { selectUser } from '@store'
import { consoleDebug } from '@utils'

export class Socket {
  private _socket: WebSocket | null = null

  onOpen: ((e: Event) => void) | null = null
  onClose: ((e: CloseEvent) => void) | null = null
  onMessage: ((e: MessageEvent<any>) => void) | null = null
  onError: ((e: Event) => void) | null = null

  constructor(token: string) {
    const userId = selectUser()?.id
    const chatId = selectCerrentId()
    if (!userId || !chatId) {
      consoleDebug('WebSocket is undefined')
      return
    }
    this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
    this.initEvents()
  }

  initEvents() {
    this._socket?.addEventListener('open', (e) => {
      this._socket?.send(JSON.stringify({
        content: '0',
        type: 'get old'
      }))
      consoleDebug('Connection established')
      if (this.onOpen) this.onOpen(e)
    })

    this._socket?.addEventListener('close', (e) => {
      if (e.wasClean) {
        consoleDebug('Connection closed cleanly')
      } else {
        consoleDebug('Connection failure')
      }
      consoleDebug(`Code: ${e.code} | Reason: ${e.reason}`)
      if (this.onClose) this.onClose(e)
    })

    this._socket?.addEventListener('message', (e) => {
      if (this.onMessage) this.onMessage(e)
    })

    this._socket?.addEventListener('error', (e) => {
      consoleDebug('Error', e)
      if (this.onError) this.onError(e)
    })
  }

  send(content: string, type: string = 'message') {
    this._socket?.send(JSON.stringify({
      content,
      type
    }))
  }

  isOpen(): boolean {
    if (!this._socket) return false
    return this._socket.readyState === 1
  }
}
