import Component from '../../../../component/Component'
import { onRouteClick } from '../../../../router/events'

class ChatsList__ChatItem extends Component {

  state = {
    onRouteClick: onRouteClick
  }

  template() { 
    return (
      `<li className='chats-list__chat-item' chatid={{props.chatid}} key={{props.keySS}}>
        <div className='chat-item__avatar'>
          <div className='avatar-empty'>
            <i className='c-gy3 fas fa-camera'></i>
          </div>
        </div>
        <div className='chat-item__content'>
          <div className='chat-item__content-top'>
            <h4 className='chat-item__chatname'>{{props.name}}</h4>
            <div className='chat-item__last-message-time'>
              <span className='last-message-time__value'>{{props.lastMessageDate}}</span>
            </div>
          </div>    
          <div className='chat-item__content-bottom'>
            <div className='chat-item__last-message'>
              {% if (props.lastMessageType === 'out') { %}
                <b>You:</b>
              {% } %}
              <div className='last-message__value'>{{props.lastMessageText}}</div>
            </div>
            {% if (props.countUnread > 0) { %}
              <div className='chat-item__count-message'>
                <a className='count-message__value'>{{props.countUnread}}</a>
              </div>
            {% } %}
          </div>    
        </div>
      </li>`
    )
  }

}

export default ChatsList__ChatItem