import Component from '../../../../component/Component'

class MessagesBar__Messages extends Component {

  template() { 
    return (
      `<ul className='messages-bar__messages'>
        // <Messages__Date></Messages__Date>
        {% for (let i = 0; i < props.messages.length; i++) { 
          const message = props.messages[i];
        %}
          <Message 
            key={{message.id}}
            type={{message.type}}  
            date={{message.date}}  
            text={{message.text}}  
          ></Message>
        {% } %}
      </ul>`
    )
  }

}



export default MessagesBar__Messages