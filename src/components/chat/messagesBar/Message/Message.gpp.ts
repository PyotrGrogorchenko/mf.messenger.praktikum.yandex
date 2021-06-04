import { Component } from '@Component'

export class Message extends Component {
  template() {
    return (
      `<div className='message'>
        <a>{{props.message.time}}</a>  
        <div className='message_content'>
          {{props.message.content}} 
        </div>
      </div>`
    )
  }
}
