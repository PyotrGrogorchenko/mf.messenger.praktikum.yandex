import { Component } from '@Component'

export class MessagesBarMessages extends Component {
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
