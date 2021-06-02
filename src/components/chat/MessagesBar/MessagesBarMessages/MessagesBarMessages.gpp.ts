import { Component } from '@Component'
import { getChatToken } from './utils'

export class MessagesBarMessages extends Component {
  componentDidMount() {
    getChatToken().then((token) => {
      const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>')
    })
  }
  template() {
    return (
      `<ul className='messages-bar__messages'>
        // {% for (let i = 0; i < props.messages.length; i++) { 
        //   const message = props.messages[i];
        // %}
        //   <Message 
        //     key={{message.id}}
        //     type={{message.type}}  
        //     date={{message.date}}  
        //     text={{message.text}}  
        //   ></Message>
        // {% } %}
      </ul>`
    )
  }
}
