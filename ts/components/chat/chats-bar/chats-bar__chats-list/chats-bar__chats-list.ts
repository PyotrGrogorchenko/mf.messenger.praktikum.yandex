import Component from '../../../../component/Component'
import { HTTPTransport } from '../../../../xhr/HTTPTransport'
import { env } from '../../../../const/index'
import { xhrPostCreateChat, xhrGetChats, xhrOnError } from '../../../../xhr/xhrExecute'

class ChatsBar__ChatsList extends Component {

  async componentDidMount(props: any, state: any) {
    
    this.setState({chats: await this.getChats()})

  }

  async getChats() {
    
    let req = await xhrGetChats()
    if (!req) { return }
    if (req.response.status >= 400) { xhrOnError() }
    
    return req.response

  }

  chatsOnClick = (e:MouseEvent) => {
    e.preventDefault()
    
    let arrli: Array<HTMLElement> = e.path.filter((el: HTMLElement) => el.nodeName === 'LI')
    if (arrli.length === 0) { return }
    let elLi = arrli[0]
    
    let id: string | null = null
    if (elLi) { id = elLi.getAttribute('id')  }

    if (id !== null) {
      //console.log(id)
      const arrUser = (this.state as any).chats.filter((el: LooseObject) => String(el.id) === id)  
      if (arrUser.length > 0) {
        this.getProps().callback({user: arrUser[0]})  
      }
    }

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

  addUser_event = async (data: LooseObject) => {
    this.setState({showSearchUsers: true})
  }

  removeUser_event = (data: LooseObject) => {
  }

  searchUsers_callback = async (chat: any) => {
    this.setState({showSearchUsers: false})
  }

  //
  addChat_event = async (data: LooseObject) => {
    this.setState({showAddChat: true})

  }

  removeChat_event = (data: LooseObject) => {
  }


  addChat_callback = async (data: LooseObject) => {
    
    this.setState({showAddChat: false})
    
    if (!data) {return}

    let req
    req  = await xhrPostCreateChat(data)
    if (req && req.status >= 400) {
      alert(`Failed to create chat: ${req.response.error}, ${req.response.reason}`)
      return
    }
  
    this.setState({chats: await this.getChats()})
  }

  state = {

    CM_onClick: this.CM_onClick,
    chatsOnClick: this.chatsOnClick,
    
    showSearchUsers: false,
    searchUsers_callback: this.searchUsers_callback,
    showAddChat: false,
    addChat_callback: this.addChat_callback
  }

  template() { 
    return (
      `
      <div className='chats-bar__chats-list' onClick={{state.chatsOnClick}} id='chats-list'>

        <ul className='chats-list__list'>
          
          {% for (let i = 0; i < state.chats.length; i++) { const chat = state.chats[i]; %}
            <ChatsList__ChatItem 
              id={{chat.id}}
              key={{chat.id}}
              name={{chat.title}}
              avatar={{chat.avatar}}
              //markId={{}}
              // lastMessageType={{chat.lastMessage.type}}
              // lastMessageDate={{chat.lastMessage.date}}
              // lastMessageText={{chat.lastMessage.text}}
              // countUnread={{chat.countUnread}}
            ></ChatsList__ChatItem>
          {% } %}
        </ul>

      </div>

      <ContextMenu 
        buttons='addChat:add:Add chat|removeChat:remove:Remove chat|addUser:add:Add user|removeUser:remove:Remove user'
        //blockButtons='addChat|removeChat'
        onClick={{state.CM_onClick}}
        ownerId='chats-list'
        menuId='chats-list-context-menu'
      ></ContextMenu>
  
      <MW__SearchUser showSearchUsers={{state.showSearchUsers}} callback={{state.searchUsers_callback}}></MW__SearchUser>
      <MW__AddChat showAddChat={{state.showAddChat}} callback={{state.addChat_callback}}></MW__AddChat>
      `
    )
  }

}

export default ChatsBar__ChatsList