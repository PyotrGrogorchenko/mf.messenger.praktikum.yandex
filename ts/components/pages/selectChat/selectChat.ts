import Component from '../../../component/component'

export default class SelectChat extends Component {

  template() { 
    return  (
      `<div className='page-chat'>
        <ChatsBar></ChatsBar>
        <MessagesBarSelect></MessagesBarSelect>      
      </div>`
    )
  }

}
