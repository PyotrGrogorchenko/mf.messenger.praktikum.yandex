import { Component } from 'gpp-templator'
import { initSocket, selectSocket, subscribe } from '@chatsController'
import { Socket } from '@socket'

let message = ''
let input: HTMLInputElement

export class MessagesBarFooter extends Component {
  componentDidMount() {
    subscribe('FLOW_SOCKET_OPEN', this.onOpen)
    input = <HTMLInputElement>document.getElementById('send-message_input')
  }

  onOpen = (socket: Socket) => {
    if (message) {
      socket.send(message)
      input.value = ''
      message = ''
    }
  }

  onClick = (e:MouseEvent) => {
    e.preventDefault()
    message = input.value
    if (!message) return
    const socket = selectSocket()
    if (!socket || !socket.isOpen()) {
      initSocket()
    } else {
      socket.send(message)
      input.value = ''
      message = ''
    }
  }

  state = {
    onClick: this.onClick
  }

  template() {
    return (
      `<div id='form__footer' className='messages-bar__footer'>
        <div className='footer__content'>
          <div className='footer__middle'>
            <Input
              id='send-message_input'
              style='secondary'
              fontSize='big'
            ></Input>
          </div>
          <div className='footer__right'>
            <Button
              id='send-message_button'
              onClick={{state.onClick}}
              icon='paperPlane'
            ></Button>
          </div>
        </div>
      </div>`
    )
  }
}
