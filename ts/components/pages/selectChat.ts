import Component from '../../component/component'
import UsersBar from '../chat/users-bar/users-bar'
import MessagesBarSelect from '../chat/messages-bar/messages-bar-select'
import PageId from '../pageId'

export default class SelectChat extends Component {

  components() {return {UsersBar, MessagesBarSelect, PageId}}
  
  template() { 

    return  (
      `<PageId pageId='select-chat'></PageId>
      <div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBarSelect></MessagesBarSelect>
      </div>`
    )
  }

}