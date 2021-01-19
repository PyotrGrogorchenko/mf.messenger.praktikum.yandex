import Component from '../../../component/Component'

export default class Chat extends Component {

  componentDidUpdate() {
    window.createValidateEvents()
  }


  currentId: number = 0

  chatsBar_callback = (data: LooseObject) => {
    if (data.user) {
      if (this.currentId === data.user.id) {
        return
      }
      this.currentId === data.user.id 
      this.setState({showMessages: true, id: String(data.user.id), avatar: data.user.avatar, title: data.user.title})
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
          <MessagesBar id={{state.id}} avatar={{state.avatar}} title={{state.title}}></MessagesBar>
        {% } else { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } %}
      </div>`
    )
  }

}



// <ChatsBar></ChatsBar>
// <MessagesBarSelect></MessagesBarSelect>      
