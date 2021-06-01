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
      `
      <div 
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
      </div>

      // <ContextMenu 
      //   buttons='addChat:add:Add chat|removeChat:remove:Remove chat|addUser:add:Add user|removeUser:remove:Remove user'
      //   //blockButtons='addChat|removeChat'
      //   onClick={{state.CM_onClick}}
      //   ownerId='chats-list'
      //   menuId='chats-list-context-menu'
      // ></ContextMenu>
  
      // <MW__SearchUser showSearchUsers={{state.showSearchUsers}} callback={{state.searchUsers_callback}}></MW__SearchUser>
      // <MW__AddChat showAddChat={{state.showAddChat}} callback={{state.addChat_callback}}></MW__AddChat>
      `
    )
  }
}
