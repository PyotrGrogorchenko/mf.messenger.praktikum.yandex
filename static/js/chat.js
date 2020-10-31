import Component from './component/component.js'
import UsersBar from './components/chat/users-bar/users-bar.js'
import MessagesBar from './components/chat/messages-bar/messages-bar.js'

class App extends Component {

  components() {return {UsersBar, MessagesBar}}
  
  func (e) {
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

const root = document.querySelector(".app")
const app = new App()
app.render(root)
