import { initSocket, subscribe } from '@chatsController'
import { Component } from '@Component'
import { Message as TypeMessage } from '@socket'

export class MessagesBarMessages extends Component {
  componentDidMount() {
    subscribe('FLOW_CURRENT_ID', this.onCurrentId)
    subscribe('FLOW_SOCKET_MESSAGE', this.onMessage)
    initSocket()
  }

  onCurrentId = () => {
    this.setState({ messages: [] })
    initSocket()
  }

  onMessage = (dataStr: string) => {
    const data = JSON.parse(dataStr)
    if (Array.isArray(data)) {
      data.sort((prev, next): number => (new Date(prev.time) > new Date(next.time) ? 1 : -1))
      this.setState({ messages: [...data] })
    } else {
      this.setState({ messages: [...this.state.messages, ...[data]] })
    }
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
