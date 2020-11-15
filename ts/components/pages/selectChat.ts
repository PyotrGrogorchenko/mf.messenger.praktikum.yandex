import Component from '../../component/component.js'
import UsersBar from '../chat/users-bar/users-bar.js'
import MessagesBarSelect from '../chat/messages-bar/messages-bar-select.js'

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