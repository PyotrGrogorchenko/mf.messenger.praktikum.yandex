import Component from '../../../component/component'

export default class Chat extends Component {

  // componentDidMount() {
  //   console.log(localStorage.getItem('currentChat'))
  // }

  func (e: any) {
    { console.log(e) }  
  }

  state() {return {
    func: this.func 
  }}

  template() { 

    return  (
      `<div className='page-chat'>
        <ChatsBar></ChatsBar>
        {% if(localStorage.getItem('currentChat') === null) { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } else { %}
          <MessagesBar func={{state.func}}></MessagesBar>
        {% } %}
      </div>`
    )
  }

}
// <ChatsBar></ChatsBar>
// <MessagesBarSelect></MessagesBarSelect>      
