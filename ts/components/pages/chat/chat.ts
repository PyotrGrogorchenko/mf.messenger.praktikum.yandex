import Component from '../../../component/Component'
import { WS } from '../../../webSocket/WebSoket'
import { xhrPostChatsToken } from '../../../xhr/xhrExecute'

export default class Chat extends Component {
  
  chatid: number = 0
  token: string = ''
  ws: WS | null = null
  avatar: string = ''
  title: string = ''

  componentDidUpdate() {
    window.createValidateEvents()
  }

  chatsBar_callback = async (data: LooseObject) => {
   
    if (data.chat) {
      if (this.chatid === data.chat.id) {
        return
      }
      this.chatid = data.chat.id 
      this.avatar = data.chat.avatar 
      this.title = data.chat.title 
      
      const req = await xhrPostChatsToken({id: this.chatid})
      this.token = req?.response.token

      this.setState({showMessages: true, shatid: String(this.chatid), chatid:this.chatid, avatar: this.avatar, title: this.title, token:this.token})

    }
  }

  state = {
    chatsBar_callback: this.chatsBar_callback,
    showMessages: false
  }

  template() { 

    return  (
      `<div className='page-chat'>
        <ChatsBar callback={{state.chatsBar_callback}}></ChatsBar>
        {% if({{state.showMessages}}) { %}
          <MessagesBar 
            chatid={{state.chatid}} 
            token={{state.token}} 
            avatar={{state.avatar}} 
            title={{state.title}} 
            sendMesageOnClick_callback={{state.sendMesageOnClick_callback}}
          ></MessagesBar>
        {% } else { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } %}
      </div>`
    )
  }

}