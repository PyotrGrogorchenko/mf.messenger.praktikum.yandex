import Component from './component/component.js'
// import PageColumn from './components/page-column.js'
//import PageChat from './components/chat/page-chat.js'
import UsersBar from './components/chat/users-bar/users-bar.js'
import MessagesBar from './components/chat/messages-bar/messages-bar.js'
// import BarHeader from './components/auth-bar/bar__header.js'
// import BarContent from './components/auth-bar/bar__content.js'
// import AuthBarInput from './components/auth-bar/auth-bar-input.js'
// import BarFooter from './components/auth-bar/bar__footer.js'
// import ButtonMain from './components/auth-bar/button-main.js'
// import ButtonSecondary from './components/auth-bar/button-secondary.js'

class App extends Component {

  components() {return {UsersBar, MessagesBar}}
  
  // state() {return {
  //   btnLogIn: {id: 'button_log-in'},  
  //   btnSignUp: {id: 'button_to-sign-up'},  
  //   inputLogin: {text: 'login', type: 'text', id: 'input_login'},
  //   inputPassword: {text: 'password', type: 'password', id: 'input_password'}  
  // }}

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

{/* 
 

  <form id="form__footer" class="messages-bar__footer">
    <button type="submit" class="button-round background-white">
      <i class="color-gray3 fas fa-paperclip"></i>
    </button>
    <div class="input-gray5">
      <input class="input-gray5__input" type="search" id="input_send-message" placeholder=" Write a message...">
    </div>
    <button type="submit" class="button-round background-blue1 margin5px">
      <i class="color-white fas fa-long-arrow-alt-right"></i>
    </button>
  </form>
</div>




 */}
