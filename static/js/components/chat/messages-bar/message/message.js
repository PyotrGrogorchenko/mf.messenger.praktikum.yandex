import Component from '../../../../component/component.js'
import Message__Incoming from './message__incoming.js'
import Message__Outgoing from './message__outgoing.js'

class Message extends Component {

  components() {return {Message__Incoming, Message__Outgoing}}

  template() { 
    return (
      `<div className="message">
        {% if (1 > 2) { %}
          <Message__Incoming></Message__Incoming>     
        {% } else { %}
          <Message__Outgoing></Message__Outgoing>     
        {% } %} 
      </div>`
    )
  }

}

export default Message