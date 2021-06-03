import { initWebSocket, subscribe } from '@chatsController'
import { Component } from '@Component'

export class MessagesBar extends Component {
  componentDidMount() {
    subscribe('FLOW_CURRENT_ID', this.onCurrnetId)
  }

  onCurrnetId = (currentId: number) => {
    this.setState({ showMessages: !!currentId })
    initWebSocket()
  }

  state = {
    showMessages: false
  }

  template() {
    return (
      `<div className='messages-bar'>
        {% if({{state.showMessages}}) { %}
          <MessagesBarHeader></>
          <MessagesBarMessages></> 
          <MessagesBarFooter></>
        {% } else { %}
          <MessagesBarHome></>
        {% } %}
      </div>`
    )
  }
}
