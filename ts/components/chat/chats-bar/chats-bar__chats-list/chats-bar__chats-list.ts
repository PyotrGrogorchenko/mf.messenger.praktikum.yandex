import Component from '../../../../component/component'
import { HTTPTransport } from '../../../../xhr/HTTPTransport'
import { env } from '../../../../const/index'
import { WSA_E_NO_MORE } from 'constants'

class ChatsBar__ChatsList extends Component {

  async getChats() {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.get(`${env.URL_REQUEST}/chats`, { withCredentials: true ,headers: {'content-type': 'application/json'}}) as XMLHttpRequest
    //console.log('getChats', req)
  }

  chatsOnClick (e:MouseEvent) {
    e.preventDefault()
    let li: Array<HTMLElement> = e.path.filter((el: HTMLElement) => el.nodeName === 'LI')
   
    if (!li) {
      return
    }
    
  }

  CM_onClick = (data: LooseObject) => {
    if (data.btnId === 'add') {

    } else if (data.btnId === 'remove') {
      this.removeUser(data)
    }
    
    //chats-list__chat-item
  }

  removeUser = (data: LooseObject) => {
    
    let chatid = ''
    for (let i = 0; i < data.targetPath.length; i++) { 
      let el: HTMLElement = data.targetPath[i]
      if (el.classList && el.classList.contains('chats-list__chat-item')) {
        chatid = el.getAttribute('chatid') as string
         break 
      }
    }    
   
    if (!chatid) {
      return
    }

    // let chats: Array<LooseObject> = this.state.chats.filter(function(item: LooseObject) {
    //   return item.id !== chatid
    // })
    let chats: Array<LooseObject> = this.state.chats.filter((item: LooseObject) => item.id !== chatid)
    this.setState({chats})
    
    //   return item.id !== chatid
    // })

    //console.log(chats)

    //const chats = this.state.chats.filter
  }

  state = {
    chats1: this.getChats(),
    CM_onClick: this.CM_onClick,
    chats: 
    [
      {id: '1', name: 'Sasha', countUnread: 10, lastMessage: {type: 'in',  date: '13:15', text: 'Putting the page number in the middle of the wording is a bad idea'}},
      {id: '2', name: 'Timur', countUnread: 500, lastMessage: {type: 'in',  date: '22:14', text: 'It was snapped off at the handle, and the blade was splintered, like somebody used it to hit something hard.'}},
      {id: '3', name: 'Lena',  countUnread: 12, lastMessage: {type: 'out', date: '02:14', text: 'Barbie saw one of the rotors break off.'}},
      {id: '4', name: 'Vika',  countUnread: 0, lastMessage: {type: 'out', date: '17:14', text: 'The Swiss Guard chopper churned in neutral as Langdon and Vittoria approached.'}},
      {id: '5', name: 'Ruprt', countUnread: 3, lastMessage: {type: 'in',  date: '20:19', text: 'Putting the page number in the middle of the wording is a bad idea,'}}
    ]
  }


  template() { 
    return (
      `<div className='chats-bar__chats-list' onClick={{state.chatsOnClick}} id='chats-list'>
        <ul className='chats-list__list'>
          
          {% for (let i = 0; i < state.chats.length; i++) { 
            const chat = state.chats[i];
          %}
            <ChatsList__ChatItem 
              chatid={{chat.id}}
              key={{chat.id}}
              name={{chat.name}}
              lastMessageType={{chat.lastMessage.type}}
              lastMessageDate={{chat.lastMessage.date}}
              lastMessageText={{chat.lastMessage.text}}
              countUnread={{chat.countUnread}}
            ></ChatsList__ChatItem>
          {% } %}
        </ul>

        <ContextMenu 
          buttons='add:Add chat|remove:Remove chat'
          onClick={{state.CM_onClick}}
          ownerId='chats-list'
          menuId='chats-list-context-menu'
        ></ContextMenu>


      </div>`
    )
  }

}

export default ChatsBar__ChatsList