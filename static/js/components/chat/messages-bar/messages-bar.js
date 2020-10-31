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
      {type: 'in',  date: '13:15', text: 'Putting the page number in the middle of the wording is a bad idea'},
      {type: 'in',  date: '22:14', text: 'It was snapped off at the handle, and the blade was splintered, like somebody used it to hit something hard.'},
      {type: 'out', date: '02:14', text: 'Barbie saw one of the rotors break off.'},
      {type: 'out', date: '17:14', text: 'The Swiss Guard chopper churned in neutral as Langdon and Vittoria approached.'},
      {type: 'in',  date: '20:19', text: 'Putting the page number in the middle of the wording is a bad idea,'}
    ]
  }}


  template() { 
    return (
      `<div className="messages-bar">
        <MessagesBar__Header></MessagesBar__Header>
        <div className="messages-bar__messages">
          <Messages__Date></Messages__Date>
          {% for (let i = 0; i < state.messages.length; i++) { 
            const message = state.messages[i];
          %}
            <Message 
              type={{message.type}}  
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