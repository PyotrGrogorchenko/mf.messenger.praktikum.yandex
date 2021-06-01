import { Component } from '@Component'

export class ChatItem extends Component {
  componentDidMount(props: any) {
    console.log('props', props)
  }
  template() {
    return (
      `<li 
        className='chats-list__chat-item'
        id={{props.chat.id}} 
        key={{props.chat.id}}
      >
        <div className='chat-item__avatar'>
          <Avatar avatar={{props.chat.avatar}}></Avatar>
        </div>
        <div className='chat-item__content'>
          <div className='chat-item__content-top'>
            <h4 className='chat-item__chatname'>
              {{props.chat.title}}
            </h4>
          </div>    
          <div className='chat-item__content-bottom'>
          </div>    
        </div>
      </li>`
    )
  }
}
