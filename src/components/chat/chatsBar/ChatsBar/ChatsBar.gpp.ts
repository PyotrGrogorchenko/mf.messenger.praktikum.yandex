import { Component } from '@Component'

export class ChatsBar extends Component {
  list_callback = () => {
    // this.getProps().callback(data)
    console.log('list_callback')
  }
  state = {
    list_callback: this.list_callback
  }

  template() {
    return (
      `<div className='chats-bar'>
        <ChatsHeader></>
        <ChatsList callback={{state.list_callback}}></>
      </div>`
    )
  }
}
