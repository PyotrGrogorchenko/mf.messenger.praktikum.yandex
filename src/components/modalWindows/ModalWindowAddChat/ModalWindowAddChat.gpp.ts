import { Component } from '@Component'

export class ModalWindowAddChat extends Component {
  button_addChatOnClick = async (e:Event) => {
    e.preventDefault()
    this.getProps().callback({ title: (document.getElementById('chat-title') as HTMLLIElement).value })
  }

  onClose = () => {
    this.getProps().callback()
  }

  state = {
    onClose: this.onClose,
    button_addChatOnClick: this.button_addChatOnClick
  }

  template() {
    return (
      `// {% if({{props.showAddChat}}) { %}
        <ModalWindow title='Add chat' callback={{state.onClose}}>
          <Input id='mw-add-chat_title' title='Title'></Input>
          <div className='add-chat_buttons'> 
            <Button text='Add' id='button_add-chat' onClick={{state.button_addChatOnClick}}></Button>
          </div>  
        </ModalWindow>
      // {% } %}
      `
    )
  }
}
