import Component from '../../../../../component/Component'

class Message extends Component {

  template() { 
    
    return (
      `<li className='message'>
        {% if ({{props.type}} === 'in') { %}
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
      </li>`
    )
  }

}

export default Message