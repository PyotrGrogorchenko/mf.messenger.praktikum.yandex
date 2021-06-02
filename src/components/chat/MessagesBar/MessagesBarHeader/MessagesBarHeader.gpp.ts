import { selectCerrentChat, selectCerrentId, subscribe } from '@chatsController'
import { Component } from '@Component'

export class MessagesBarHeader extends Component {
  componentDidMount() {
    subscribe('FLOW_CURRENT_ID', this.onCurrnetId)
  }

  onCurrnetId = () => {
    if (!selectCerrentId()) return
    this.setState({ chat: selectCerrentChat() })
  }

  state = {
    chat: selectCerrentChat()
  }

  template() {
    return (
      `<div className='messages-bar__header' id={{state.chat.id}}>
        <div className='header__avatar'>
          <Avatar avatar={{state.chat.avatar}}></Avatar>
        </div>
        <div className='header__content'>
          <div className='header__username'>
            <h1>{{state.chat.title}}</h1>
          </div>
        </div>
      </div>`

    )
  }
}
