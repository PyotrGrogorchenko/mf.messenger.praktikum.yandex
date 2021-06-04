import { Component } from '@Component'
import { Chat } from '@xhrTypes'
import { getChats, subscribe } from '@chatsController'

export class ChatsList extends Component {
  currentChatId: number = 0

  componentDidMount() {
    subscribe('FLOW_CHATS', this.onChats)
    getChats()
  }

  onChats = (chats: Chat[]) => {
    this.setState({ chats })
  }

  state = {
    showSearchUsers: false,
    showAddChat: false,
    chats: []
  }

  template() {
    return (
      `<div 
        className='chats-bar__chats-list' 
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
