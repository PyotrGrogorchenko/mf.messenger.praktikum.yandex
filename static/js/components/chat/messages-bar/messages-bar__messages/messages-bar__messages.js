//#Import
import Message from '../../../../components/chat/messages-bar/message/message/message.js'
import Messages__Date from '../../../../components/chat/messages-bar/messages__date/messages__date.js'
//#Import
import Component from '../../../../component/Component.js';
class MessagesBar__Messages extends Component {
    //#Components
components() {return {Messages__Date,Message}}
//#Components
template() {
        return (`<ul className='messages-bar__messages'>
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
      </ul>`);
    }
}
export default MessagesBar__Messages;
//# sourceMappingURL=messages-bar__messages.js.map