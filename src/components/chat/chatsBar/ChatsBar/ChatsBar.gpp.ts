import { Component } from '@Component'

export class ChatsBar extends Component {
  template() {
    return (
      `<div className='chats-bar'>
        <ChatsHeader></>
        <ChatsList></>
      </div>`
    )
  }
}
