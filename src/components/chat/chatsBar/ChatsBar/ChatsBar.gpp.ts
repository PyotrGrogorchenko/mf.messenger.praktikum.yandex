import { Component } from 'gpp-templator'

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
