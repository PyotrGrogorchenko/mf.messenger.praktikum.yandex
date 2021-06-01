import { Component } from '@Component'

export class ModalWindowChatCreate extends Component {
  onChatCreate = async (e:Event) => {
    e.preventDefault()
    const input = <HTMLInputElement>document.getElementById('chat-create-input')
    if (this.getProps().cb) this.getProps().cb(input.value)
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
      `<ModalWindow title='New chat title' cb={{state.onClose}}>
        <Input id='chat-create-input' title='Title' style='secondary'></Input>
        <div className='chat-create-buttons'> 
          <Button text='Create chat' id='chat-create-button' onClick={{state.onChatCreate}} margin='middle'></Button>
        </div>  
      </ModalWindow>`
    )
  }
}
