import Component from '../../component/component'
import UsersBar from '../chat/users-bar/users-bar'
import MessagesBar from '../chat/messages-bar/messages-bar'

export default class Chat extends Component {

  components() {return {UsersBar, MessagesBar}}
  
  func (e: any) {
    { console.log(e) }  
  }

  state() {return {
    func: this.func 
  }}

  template() { 

    return  (

      `<div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBar func={{state.func}}></MessagesBar>
      </div>`
    )
  }

}