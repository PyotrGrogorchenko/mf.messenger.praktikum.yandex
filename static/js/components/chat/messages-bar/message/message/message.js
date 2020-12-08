//#Import
import Message__Outgoing from '../../../../../components/chat/messages-bar/message/message__outgoing/message__outgoing.js'
import Message__Incoming from '../../../../../components/chat/messages-bar/message/message__incoming/message__incoming.js'
//#Import
import Component from '../../../../../component/component.js';
class Message extends Component {
    //#Components
components() {return {Message__Incoming,Message__Outgoing}}
//#Components
template() {
        return (`<div className='message'>
        {% if (props.type === 'in') { %}
          <Message__Incoming
            text={{props.text}}
            date={{props.date}}
          ></Message__Incoming>     
        {% } else { %}
          <Message__Outgoing
            text={{props.text}}
            date={{props.date}}
          ></Message__Outgoing>     
        {% } %} 
      </div>`);
    }
}
export default Message;
//# sourceMappingURL=message.js.map