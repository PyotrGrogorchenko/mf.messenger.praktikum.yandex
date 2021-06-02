import { Component } from '@Component'

export class Chat extends Component {
  template() {
    return (
      `<div className='page-chat'>
        <ChatsBar></>
        <MessagesBar></>
      </div>`
    )
  }
}
