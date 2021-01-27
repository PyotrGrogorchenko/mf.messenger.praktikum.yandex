class WS {

  socket: WebSocket | null = null
  
  onOpen: any = undefined
  onClose: any = undefined
  onMessage: any = undefined
  onError: any = undefined
  
  // userid: string = ''
  // chatid:string = ''
  // token: string = ''

  constructor(userid: string, chatid:string, token: string) {
    
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userid}/${chatid}/${token}`)
    
    this.initEvents()
  }

  initEvents() {
    
    this.socket?.addEventListener('open', () => {
      console.log('Соединение установлено');
      
      if (this.onOpen) { this.onOpen() }
      // this.socket?.send(JSON.stringify({
      //     content: 'Моё первое сообщение миру!',
      //     type: 'message',
      // }));
    })

    this.socket?.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения')
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      
      if (this.onClose) { this.onClose(event) }
    
    })
    
    this.socket?.addEventListener('message', (event) => {
      console.log('Получены данные', event.data)
    
      if (this.onMessage) { this.onMessage(event) }
    
    })

    this.socket?.addEventListener('error', (event) => {
      console.log('Ошибка', event)
      
      if (this.onError) { this.onError(event) }
            
    })
    
  }

  send(content: string, type: string = 'message') {
    this.socket?.send(JSON.stringify({
      content,
      type
    }))
  }

}

export { WS }