import { selectCerrentId } from '@chatsController'
import { selectUser } from '@store'

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
      // eslint-disable-next-line no-console
      console.error('WebSocket is undefined')
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
      // eslint-disable-next-line no-console
      console.log('Соединение установлено')
      if (this.onOpen) this.onOpen(e)
    })

    this._socket?.addEventListener('close', (e) => {
      if (e.wasClean) {
        // eslint-disable-next-line no-console
        console.log('Соединение закрыто чисто')
      } else {
        // eslint-disable-next-line no-console
        console.log('Обрыв соединения')
      }
      // eslint-disable-next-line no-console
      console.log(`Код: ${e.code} | Причина: ${e.reason}`)

      if (this.onClose) this.onClose(e)
    })

    this._socket?.addEventListener('message', (e) => {
      if (this.onMessage) this.onMessage(e)
    })

    this._socket?.addEventListener('error', (e) => {
      // eslint-disable-next-line no-console
      console.log('Ошибка', e)
      if (this.onError) this.onError(e)
    })
  }

  send(content: string, type: string = 'message') {
    this._socket?.send(JSON.stringify({
      content,
      type
    }))
  }
}
