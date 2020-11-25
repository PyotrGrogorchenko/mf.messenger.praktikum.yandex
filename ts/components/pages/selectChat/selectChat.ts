import Component from '../../../component/component'

export default class SelectChat extends Component {

  template() { 
    return  (
      `<div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBarSelect></MessagesBarSelect>      
      </div>`
    )
  }

}
