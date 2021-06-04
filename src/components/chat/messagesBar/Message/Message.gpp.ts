import { Component } from '@Component'
import { formatDate } from '@utils'

export class Message extends Component {
  state = {
    date: formatDate(this.getProps().message.time)
  }

  template() {
    return (
      `<div className='message'>
        <a className='message_date'>
          {{state.date}}
        </a>  
        <div className='message_content'>
          {{props.message.content}} 
        </div>
      </div>`
    )
  }
}
