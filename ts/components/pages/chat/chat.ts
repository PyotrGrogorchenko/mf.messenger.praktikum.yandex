import Component from '../../../component/Component'
import { xhrPostChatsToken } from '../../../xhr/xhrExecute'

export default class Chat extends Component {
  
  currentId: number = 0

  componentDidUpdate() {
    window.createValidateEvents()
  }




  chatsBar_callback = async (data: LooseObject) => {
   
    if (data.chat) {
      if (this.currentId === data.chat.id) {
        return
      }
      this.currentId === data.chat.id 
      
      let req = await xhrPostChatsToken({id:data.chat.id})
      const token = req?.response.token
      console.log('userid', localStorage.getItem('id'), 'chatid', data.chat.id, 'token',token)
      console.log('socket', `wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('id')}/${data.chat.id}/${token}`)
      //if (!req) { return }
      //if (req.response.status >= 400) { xhrOnError() }
      
      //const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>')
      const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('id')}/${data.chat.id}/${token}`)

      socket.addEventListener('open', () => {
        console.log('Соединение установлено');
    
        socket.send(JSON.stringify({
            content: 'Моё первое сообщение миру!',
            type: 'message',
        }));
      });
    
      socket.addEventListener('close', event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }
    
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });
    
      socket.addEventListener('message', event => {
        console.log('Получены данные', event)  
        console.log('Получены данные', event.data);
      });
    
      socket.addEventListener('error', event => {
        console.log('Ошибка', event);
      }); 


      this.setState({showMessages: true, id: String(data.chat.id), avatar: data.chat.avatar, title: data.chat.title})
    }
  }

  state = {
    chatsBar_callback: this.chatsBar_callback,
    showMessages: false
  }

  template() { 

    return  (
      `<div className='page-chat'>
        <ChatsBar callback={{state.chatsBar_callback}}></ChatsBar>
        {% if({{state.showMessages}}) { %}
          <MessagesBar id={{state.id}} avatar={{state.avatar}} title={{state.title}}></MessagesBar>
        {% } else { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } %}
      </div>`
    )
  }

}



// <ChatsBar></ChatsBar>
// <MessagesBarSelect></MessagesBarSelect>      
