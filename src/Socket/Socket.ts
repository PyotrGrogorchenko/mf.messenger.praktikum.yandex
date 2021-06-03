import { selectCerrentId } from '@chatsController'
import { selectUser } from '@store'
import { OnEvent } from './types'

export class Socket {
  private _Socket: WebSocket | null = null

  onOpen: OnEvent| null = null
  onClose: OnEvent| null = null
  onMessage: OnEvent| null = null
  onError: OnEvent| null = null

  constructor(token: string) {
    const userId = selectUser()?.id
    const chatId = selectCerrentId()
    if (!userId || !chatId) {
      // eslint-disable-next-line no-console
      console.error('WebSocket is undefined')
      return
    }
    this._Socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
    this.initEvents()
  }

  initEvents() {
    this._Socket?.addEventListener('open', (e) => {
      // eslint-disable-next-line no-console
      console.log('Соединение установлено')
      if (this.onOpen) this.onOpen(e)
    })

    this._Socket?.addEventListener('close', (e) => {
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

    this._Socket?.addEventListener('message', (e) => {
      if (this.onMessage) this.onMessage(e)
    })

    this._Socket?.addEventListener('error', (e) => {
      // eslint-disable-next-line no-console
      console.log('Ошибка', e)
      if (this.onError) this.onError(e)
    })
  }

  send(content: string, type: string = 'message') {
    this._Socket?.send(JSON.stringify({
      content,
      type
    }))
  }
}
