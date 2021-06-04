import { initSocket, subscribe } from '@chatsController'
import { Component } from '@Component'
import { Socket, Message as TypeMessage } from '@socket'

export class MessagesBarMessages extends Component {
  async componentDidMount() {
    subscribe('FLOW_CURRENT_ID', this.onCurrentId)
    subscribe('FLOW_SOCKET', this.onSocket)
    initSocket()
  }

  onSocket = (socket: Socket | null) => {
    if (socket) {
      socket.onMessage = this.onMessage
      socket.onClose = this.onClose
    }
  }

  onCurrentId = () => {
    this.setState({ messages: [] })
    initSocket()
  }

  onMessage = (e: MessageEvent<any>) => {
    const data = JSON.parse(e.data)
    if (Array.isArray(data)) {
      data.sort((prev, next): number => (new Date(prev.time) > new Date(next.time) ? 1 : -1))
      this.setState({ messages: [...data] })
    } else {
      this.setState({ messages: [...this.state.messages, ...[data]] })
    }
  }

  onClose = (e: CloseEvent) => {
    e.preventDefault()
    initSocket()
  }

  state = {
    messages: <TypeMessage[]>[]
  }

  template() {
    return (
      `<ul className='messages-bar__messages'>
        {% for (let i = 0; i < state.messages.length; i++) { 
            const message = state.messages[i];
        %}
          <Message 
            key={{message.id}}
            message={{message}}
          ></Message>
        {% } %}
      </ul>`
    )
  }
}
