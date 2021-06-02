import { createChat } from '@chatsController'
import { Component } from '@Component'

export class ChatCreateForm extends Component {
  onChatCreate = async (e:Event) => {
    e.preventDefault()
    const input = <HTMLInputElement>document.getElementById('chat-create__input')
    const { value } = input
    if (!value) {
      // eslint-disable-next-line no-alert
      alert('Write chat title, please')
      return
    }
    createChat(value).then(() => {
      if (this.getProps().cb) this.getProps().cb()
    })
  }

  onClose = () => {
    if (this.getProps().cb) this.getProps().cb()
  }

  state = {
    onClose: this.onClose,
    onChatCreate: this.onChatCreate
  }

  template() {
    return (
      `<ModalWindow title='Сreating a chat' cb={{state.onClose}}>
        <Input id='chat-create__input' style='secondary'></Input>
          <Button
          text='Create chat'
          id='chat-create__button'
          onClick={{state.onChatCreate}}
          style='link'
          icon='chatCreate'
          margin='middle'
        ></>
      </ModalWindow>`
    )
  }
}
