import Component from '../../../../component/component'
import { HTTPTransport } from '../../../../xhr/HTTPTransport'
import { env } from '../../../../const/index'

class ChatsBar__ChatsList extends Component {

  async getChats() {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.get(`${env.URL_REQUEST}/chats`, { withCredentials: true ,headers: {'content-type': 'application/json'}}) as XMLHttpRequest
    console.log(req)
  }

  chatsOnClick (e:MouseEvent) {
    e.preventDefault()
    var li: Array<HTMLElement> = e.path.filter(function(el: HTMLElement) {
      return el.nodeName === 'LI'
    })
   
    if (!li) {
      return
    }
    
    console.log(li[0].getAttribute('chatid'))
  }

  CM_OnClick (e:Event) {
    e.preventDefault()
    console.log(e)
  }

  contextMenuOnClick (e:Event) {
    e.preventDefault()
  }


  state() {return {
    chats1: this.getChats(),
    CM_OnClick: this.CM_OnClick,
    chatsOnClick: this.chatsOnClick,
    contextMenuOnClick: this.contextMenuOnClick,
    chats: 
    [
      {id: 1, name: 'Sasha', countUnread: 10, lastMessage: {type: 'in',  date: '13:15', text: 'Putting the page number in the middle of the wording is a bad idea'}},
      {id: 2, name: 'Timur', countUnread: 500, lastMessage: {type: 'in',  date: '22:14', text: 'It was snapped off at the handle, and the blade was splintered, like somebody used it to hit something hard.'}},
      {id: 3, name: 'Lena',  countUnread: 12, lastMessage: {type: 'out', date: '02:14', text: 'Barbie saw one of the rotors break off.'}},
      {id: 4, name: 'Vika',  countUnread: 0, lastMessage: {type: 'out', date: '17:14', text: 'The Swiss Guard chopper churned in neutral as Langdon and Vittoria approached.'}},
      {id: 5, name: 'Ruprt', countUnread: 3, lastMessage: {type: 'in',  date: '20:19', text: 'Putting the page number in the middle of the wording is a bad idea,'}}
    ]
  }}


  template() { 
    return (
      `<div className='chats-bar__chats-list' onClick={{state.chatsOnClick}} id='chats-list'>
        <ul className='chats-list__list'>
          
          {% for (let i = 0; i < state.chats.length; i++) { 
            const chat = state.chats[i];
          %}
            <ChatsList__ChatItem 
              chatid={{chat.id}}
              name={{chat.name}}
              lastMessageType={{chat.lastMessage.type}}
              lastMessageDate={{chat.lastMessage.date}}
              lastMessageText={{chat.lastMessage.text}}
              countUnread={{chat.countUnread}}
            ></ChatsList__ChatItem>
          {% } %}
         
          <ContextMenu 
            buttons='add:Add chat|remove:Remove chat'
            onClick={{state.CM_OnClick}}
            ownerId='chats-list'
            menuId='chats-list-context-menu'
          ></ContextMenu>
         
         
        </ul>
      </div>`
    )
  }

}

export default ChatsBar__ChatsList