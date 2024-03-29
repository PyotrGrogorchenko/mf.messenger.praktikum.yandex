import { Component } from 'gpp-templator'
import { deleteChat, selectCerrentId } from '@chatsController'

export class ChatsButtons extends Component {
  chatCreateClick = (e:MouseEvent) => {
    e.preventDefault()
    this.setState({ chatCreateShow: true })
  }

  onChatCreate = () => {
    this.setState({ chatCreateShow: false })
  }

  chatDeleteClick = (e:MouseEvent) => {
    e.preventDefault()
    deleteChat()
  }

  userAddClick = (e:MouseEvent) => {
    e.preventDefault()
    if (!selectCerrentId()) {
      // eslint-disable-next-line no-alert
      alert('Select a chat, please')
      return
    }
    this.setState({ userAddShow: true })
  }

  onUserAdd = () => {
    this.setState({ userAddShow: false })
  }

  state = {
    chatCreateClick: this.chatCreateClick,
    onChatCreate: this.onChatCreate,
    chatDeleteClick: this.chatDeleteClick,
    userAddClick: this.userAddClick,
    onUserAdd: this.onUserAdd,
    chatCreateShow: false,
    userAddShow: false
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
            onClick={{state.chatDeleteClick}}
            align='start'
            style='link'
            icon='chatDelete'
            margin='small'
          ></>
          <Button
            text='Add user'
            id='button_userAdd'
            onClick={{state.userAddClick}}
            align='start'
            style='link'
            icon='userAdd'
            margin='small'
          ></>
        </div>
        
        {% if({{state.chatCreateShow}}) { %}
          <ChatCreateForm cb={{state.onChatCreate}}></>
        {% } %}
        {% if({{state.userAddShow}}) { %}
          <UserSearchForm cb={{state.onUserAdd}}></>
        {% } %}`
    )
  }
}
