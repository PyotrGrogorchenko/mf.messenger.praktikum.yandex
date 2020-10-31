import Component from '../../../component/component.js'
import MessagesBar__Header from './messages-bar__header.js'
import Messages__Date from './messages__date.js'
import Message from './message/message.js'
import MessagesBar__Footer from './messages-bar__footer.js'

class MessagesBar extends Component {

  components() {return {MessagesBar__Header, Messages__Date, Message, MessagesBar__Footer}}

  state() {return {
    messages: 
    [
      {incoming: true, date: '22:14', text: 'Putting the page number in the middle of the wording is a bad idea,'}
    ]
  
  }}


  template() { 
    return (
      `<div className="messages-bar">
        <MessagesBar__Header></MessagesBar__Header>
        <div className="messages-bar__messages">
          <Messages__Date></Messages__Date>
          {% for (let i = 0; i < 5; i++) { 
            const message = state.messages[i]  %}
            <Message 
              incoming={{message.incoming}}  
              date={{message.date}}  
              text={{message.text}}  
            ></Message>
          {% } %}
        </div>
        <MessagesBar__Footer></MessagesBar__Footer>
      </div>`
    )
  }

}



export default MessagesBar