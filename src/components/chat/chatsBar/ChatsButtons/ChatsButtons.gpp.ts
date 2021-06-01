import { Component } from '@Component'
import { createChat } from '@chatsController'

export class ChatsButtons extends Component {
  chatCreateClick = (e:MouseEvent) => {
    e.preventDefault()
    this.setState({ chatCreateShow: true })
  }

  chatCreateCb = (chatName: string) => {
    this.setState({ chatCreateShow: false })
    if (!chatName) return
    createChat(chatName)
  }

  state = {
    chatCreateClick: this.chatCreateClick,
    chatCreateCb: this.chatCreateCb,
    chatCreateShow: false
  }

  template() {
    return (
      `<div id='chats-bar__buttons'>
          <Button
            text='Create chat'
            id='button_chatCreate'
            onClick={{state.chatCreateClick}}
            align='start'
            style='link'
            icon='chatCreate'
            margin='middle'
          ></>
          <Button
            text='Delete chat'
            id='button_chatDelete'
            onClick={{state.onClick}}
            align='start'
            style='link'
            icon='chatDelete'
            margin='small'
          ></>
          <Button
            text='Add user'
            id='button_userAdd'
            onClick={{state.onClick}}
            align='start'
            style='link'
            icon='userAdd'
            margin='small'
          ></>
          <Button
            text='Remove user'
            id='button_userRemove'
            onClick={{state.onClick}}
            align='start'
            style='link'
            icon='userRemove'
            margin='small'
          ></>        
        </div>
        
        {% if({{state.chatCreateShow}}) { %}
          <ModalWindowChatCreate cb={{state.chatCreateCb}}></>
        {% } %}
        
        `
    )
  }
}
