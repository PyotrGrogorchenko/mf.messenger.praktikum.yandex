import Component from '../../../../../component/component'

class Message extends Component {

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