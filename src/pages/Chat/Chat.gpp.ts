import { Component } from '@Component'

export class Chat extends Component {
  template() {
    return (
      `<Root>
          <div className='page-chat'>
            <ChatsBar></>
            <MessagesBar></>
          </div>
      </Root>`
    )
  }
}
