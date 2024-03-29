import { Component } from 'gpp-templator'
import { subscribe } from '@chatsController'

export class MessagesBar extends Component {
  componentDidMount() {
    subscribe('FLOW_CURRENT_ID', this.onCurrnetId)
  }

  onCurrnetId = (currentId: number) => {
    this.setState({ showMessages: !!currentId })
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
