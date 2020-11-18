import Component from '../../component/component'
import UsersBar from '../chat/users-bar/users-bar'
import MessagesBar from '../chat/messages-bar/messages-bar'
import PageId from '../pageId'

export default class Chat extends Component {

  components() {return {UsersBar, MessagesBar, PageId}}
  
  func (e: any) {
    { console.log(e) }  
  }

  state() {return {
    func: this.func 
  }}

  template() { 

    return  (

      `<PageId pageId='chat'></PageId>
      <div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBar func={{state.func}}></MessagesBar>
      </div>`
    )
  }

}