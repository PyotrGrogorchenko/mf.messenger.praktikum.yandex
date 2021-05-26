import { Component } from '@Component'
// import {
//   xhrPostCreateChat, xhrGetChats, xhrOnError, xhrPutChatUsers
// } from '@xhr'
import { getChats } from './utils'

export class ChatsList extends Component {
  currentChatId: number = 0

  componentDidMount(props: any, state: any) {
    this.setState({ chats: getChats() })
  }

  // async getChats() {
  //   const req = await xhrGetChats()
  //   if (!req) {return}
  //   if (req.response.status >= 400) {xhrOnError()}

  //   return req.response
  // }

  chatsOnClick = (e:MouseEvent) => {
    e.preventDefault()

    // const arrli: Array<HTMLElement> = e.path.filter((el: HTMLElement) => el.nodeName === 'LI')
    // if (arrli.length === 0) {return}
    // const elLi = arrli[0]

    // let chatId: string | null = null
    // if (elLi) {chatId = elLi.getAttribute('id')}
    // this.currentChatId = Number(chatId as string)
    // if (chatId !== null) {
    //   const arrChats = (this.state as any).chats.filter((el: LooseObject) => String(el.id) === chatId)
    //   if (arrChats.length > 0) {
    //     this.getProps().callback({ chat: arrChats[0] })
    //   }
    // }
  }

  CM_onClick = (data: LooseObject) => {
    if (data.btnId === 'addUser') {
      this.addUser_event(data)
    } else if (data.btnId === 'removeUser') {
      this.removeUser_event(data)
    } else if (data.btnId === 'addChat') {
      this.addChat_event(data)
    } else if (data.btnId === 'removeChat') {
      this.removeChat_event(data)
    }
  }

  addUser_event = (data: LooseObject) => {
    // this.setState({ showSearchUsers: true })
  }

  removeUser_event = (data: LooseObject) => {
  }

  searchUsers_callback = (user: any) => {
    // this.setState({ showSearchUsers: false })

    // if (!user) return

    // const req = await xhrPutChatUsers({
    //   chatId: this.currentChatId,
    //   users: [user.id]
    // })
  }

  addChat_event = (data: LooseObject) => {
    // this.setState({ showAddChat: true })
  }

  removeChat_event = (data: LooseObject) => {
  }

  addChat_callback = (data: LooseObject) => {
    // this.setState({ showAddChat: false })

    // if (!data) {return}

    // const req = await xhrPostCreateChat(data)
    // if (req && req.status >= 400) {
    //   alert(`Failed to create chat: ${req.response.error}, ${req.response.reason}`)
    //   return
    // }

    // this.setState({ chats: await this.getChats() })
  }

  chatsOnСontextMenu = (e:MouseEvent) => {

    // e.preventDefault()

    // let arrli: Array<HTMLElement> = e.path.filter((el: HTMLElement) => el.nodeName === 'LI')
    // if (arrli.length === 0) { return }
    // let elLi = arrli[0]

    // let chatId: string | null = null
    // if (elLi) { chatId = elLi.getAttribute('id')  }
    // this.currentChatId = Number(chatId as string)

  }

  state = {

    CM_onClick: this.CM_onClick,
    chatsOnClick: this.chatsOnClick,
    chatsOnСontextMenu: this.chatsOnСontextMenu,

    showSearchUsers: false,
    searchUsers_callback: this.searchUsers_callback,
    showAddChat: false,
    addChat_callback: this.addChat_callback
  }

  template() {
    return (
      `
      <div 
        className='chats-bar__chats-list' 
        onClick={{state.chatsOnClick}} 
        oncontextmenu={{state.chatsOnСontextMenu}} 
        id='chats-list'
      >
        <ul className='chats-list__list'>
          {% for (let i = 0; i < state.chats.length; i++) 
            { const chat = state.chats[i]; %}
            <ChatItem 
              chat={{chat}} key={{chat.key}}
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
