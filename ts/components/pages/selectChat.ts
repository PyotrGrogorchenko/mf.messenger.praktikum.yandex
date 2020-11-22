import Component from '../../component/component'
import UsersBar from '../chat/users-bar/users-bar'
import MessagesBarSelect from '../chat/messages-bar/messages-bar-select'

export default class SelectChat extends Component {

  components() {return {UsersBar, MessagesBarSelect}}
  
  template() { 

    return  (
      `<div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBarSelect></MessagesBarSelect>
      </div>`
    )
  }

}