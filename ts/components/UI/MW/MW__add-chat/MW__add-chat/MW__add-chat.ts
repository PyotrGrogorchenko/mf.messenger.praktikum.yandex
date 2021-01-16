import Component from '../../../../../component/Component'

class MW__AddChat extends Component {

  button_addChatOnClick = async (e:Event) => {
    this.getProps().callback({title: (document.getElementById('chat-title') as HTMLLIElement).value})
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
      `{% if({{props.showAddChat}}) { %}
        <MW title='Add chat' callback={{state.onClose}}>
          <InputGray5 id='chat-title' title='Title'></InputGray5>
          <div className='add-chat_buttons'> 
            <ButtonSecondary text='Add' id='button_add-chat' onClick={{state.button_addChatOnClick}}></ButtonSecondary>
          </div>  
        </MW>
      {% } %}`
    )
  }

}

export default MW__AddChat