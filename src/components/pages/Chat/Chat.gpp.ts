import { Component } from '@Component'

export class Chat extends Component {
  chatid: number = 0
  token: string = ''
  // ws: WS | null = null
  avatar: string = ''
  title: string = ''

  componentDidMount() {
    //   window.createValidateEvents()
  }

  state = {
    showMessages: true
  }

  template() {
    return (
      `<div className='page-chat'>
        <ChatsBar callback={{state.chatsBar_callback}}></ChatsBar>
        {% if({{state.showMessages}}) { %}
          <MessagesBar 
      //     chatid={{state.chatid}} 
      //     token={{state.token}} 
      //     avatar={{state.avatar}} 
      //     title={{state.title}} 
      //     sendMesageOnClick_callback={{state.sendMesageOnClick_callback}}
          ></MessagesBar>
        {% } else { %}
          <MessagesBarHome></>
        {% } %}
      </div>`
    )
  }
}
