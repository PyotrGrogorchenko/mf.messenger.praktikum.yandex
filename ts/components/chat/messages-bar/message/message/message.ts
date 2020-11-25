import Component from '../../../../../component/component'
import Message__Incoming from './message__incoming'
import Message__Outgoing from './message__outgoing'

class Message extends Component {

  components() {return {Message__Incoming, Message__Outgoing}}

  template() { 
    
    return (
      `<div className="message">
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
      </div>`
    )
  }

}

export default Message