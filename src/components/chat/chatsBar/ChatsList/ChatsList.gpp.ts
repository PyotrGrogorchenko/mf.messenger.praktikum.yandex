import { Component } from '@Component'
import { Chat } from '@xhrTypes'
import { readChats, subscribe } from '@chatsController'

export class ChatsList extends Component {
  currentChatId: number = 0

  componentDidMount() {
    subscribe('FLOW_CHATS', this.onChats)
    readChats()
  }

  onChats = (chats: Chat[]) => {
    this.setState({ chats })
  }

  chatsOnClick = (e:MouseEvent) => {
    e.preventDefault()
  }

  state = {
    chatsOnClick: this.chatsOnClick,
    showSearchUsers: false,
    showAddChat: false,
    chats: []

  }

  template() {
    return (
      `<div 
        className='chats-bar__chats-list' 
        onClick={{state.chatsOnClick}} 
        id='chats-list'
      >
        <ul className='chats-list__list'>
          {% for (let i = 0; i < state.chats.length; i++) 
            { const chat = state.chats[i]; %}
            <ChatItem 
              chat={{chat}} key={{chat.id}}
            ></ChatItem>
          {% } %}
        </ul>
      </div>`
    )
  }
}
