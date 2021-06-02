import { selectCerrentId, setCerrentId, subscribe } from '@chatsController'
import { Component } from '@Component'
import { getClasses } from './utils'

export class ChatItem extends Component {
  componentDidMount() {
    subscribe('FLOW_CURRENT_ID', this.onCurrentId)
  }

  onCurrentId = () => {
    this.setState({ classes: getClasses(selectCerrentId() === this.state.id) })
  }

  onClick = (e: Event) => {
    e.preventDefault()
    if (selectCerrentId() === this.state.id) return
    setCerrentId(this.state.id)
  }

  state = {
    id: Number(this.getProps().key),
    onClick: this.onClick,
    classes: getClasses()
  }

  template() {
    return (
      `<li 
        className={{state.classes.li}}
        id={{props.chat.id}} 
        key={{props.chat.id}}
        onClick={{state.onClick}}
      >
        <div className='chat-item__avatar'>
          <Avatar avatar={{props.chat.avatar}}></Avatar>
        </div>
        <div className='chat-item__content'>
          <div className='chat-item__content-top'>
            <h4 className='chat-item__chatname'>
              {{props.chat.title}}
            </h4>
          </div>    
          <div className='chat-item__content-bottom'>
          </div>    
        </div>
      </li>`
    )
  }
}
