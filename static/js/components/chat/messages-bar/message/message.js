import Component from '../../../../component/component.js';
import Message__Incoming from './message__incoming.js';
import Message__Outgoing from './message__outgoing.js';
class Message extends Component {
    components() { return { Message__Incoming, Message__Outgoing }; }
    template() {
        return (`<div className="message">
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