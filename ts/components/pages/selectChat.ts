import Component from '../../component/component.js'
import UsersBar from '../chat/users-bar/users-bar.js'
import MessagesBarSelect from '../chat/messages-bar/messages-bar-select.js'

class App extends Component {

  components() {return {UsersBar, MessagesBarSelect}}
  
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
        <MessagesBarSelect></MessagesBarSelect>
      </div>`
    )
  }

}  

const root: HTMLElement | null = document.querySelector(".app")
const app: App = new App()
app.render(root)
