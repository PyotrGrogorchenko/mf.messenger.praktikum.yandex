import Component from './component/component.js'
import PageColumn from './components/page-column.js'
import BarHeader from './components/auth-bar/bar__header.js'
import BarContent from './components/auth-bar/bar__content.js'
import AuthBarInput from './components/auth-bar/auth-bar-input.js'
import BarFooter from './components/auth-bar/bar__footer.js'
import ButtonMain from './components/UI/buttons/button-main.js'
import ButtonSecondary from './components/UI/buttons/button-secondary.js'
import Message__Incoming from './components/chat/messages-bar/message/message__incoming.js'
import Message__Outgoing from './components/chat/messages-bar/message/message__outgoing.js'

export default class Index extends Component {

  components() {return {PageColumn, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary, 
                          Message__Incoming, Message__Outgoing}}
  
    func (e:Event) {
      { console.log(e) }  
    }

    state() {return {
      func: this.func 
    }}

//   state() {return {
//     messages: 
//     [
//       {incoming: true, date: '22:14', text: 'Putting the page number in the middle of the wording is a bad idea,'}
//     ]
  
//   }}
 

  template() { 

    return  (

      `<PageColumn>
        <nav >
          <a className="main-nav-a" href="#{R}login" >Login  </a>
          <a className="main-nav-a" href="#{R}signup">Signup</a>
          <a className="main-nav-a" href="#{R}selectChat">selectChat</a>
          <a className="main-nav-a" href="#{R}chat">chat</a>
          <a className="main-nav-a" href="#{R}error404">error404</a>
          <a className="main-nav-a" href="#{R}error500">error500</a>
          <a className="main-nav-a" href="#{R}userSettings">userSettings</a>
        </nav>
      </PageColumn>`

      // `<PageColumn>
      //   <div>Messanger</div>
      // </PageColumn>`
  
    ) }
//       // `<div className="messages-bar">
//       //   <MessagesBar__Header></MessagesBar__Header>
//       //   <div className="messages-bar__messages">
//       //     <Messages__Date></Messages__Date>
//       //     {% for (let i = 0; i < 5; i++) { 
//       //       const message = state.messages[i]  %}
//       //       <Message 
//       //         incoming={{message.incoming}}  
//       //         date={{message.date}}  
//       //         text={{message.text}}  
//       //       ></Message>
//       //     {% } %}
//       //   </div>
//       //   <MessagesBar__Footer></MessagesBar__Footer>
//       // </div>`
      
//       // `<form id="form__footer" className="messages-bar__footer">
//       //   <button type="submit" className="button-round background-white">
//       //     <i className="color-gray3 fas fa-paperclip"></i>
//       //   </button>
//       //   <div className="input-gray5">
//       //   </div>
//       // </form>`

//      // `<input className="input-gray5__input" type="search" id="input_send-message" placeholder="Write..."></input>`

//     // <div className="input-gray5">
//     //   <input className="input-gray5__input" type="search" id="input_send-message" placeholder=" Write a message...">
//     // </div>
//     // <button type="submit" className="button-round background-blue1 margin5px">
//     //   <i className="color-white fas fa-long-arrow-alt-right"></i>
//     // </button>
  

//       // `<span className="message__info">
//       //   <i className="hide color-gray2 fas fa-check-double"></i>
//       //   22:14
//       // </span>`
      
//       // `<PageColumn>
//       // {% for (let i = 0; i < 5; i++) { %}
//       //   <ButtonMain text='Chat ' onClick={{state.func}} > </ButtonMain>
//       //   <div className="test ttt">
//       //     <ButtonSecondary text='Chat {{i}}'> </ButtonSecondary>
//       //   </div>  
//       // {% } %}
//       // </PageColumn>`

//       // `{% if (1 > 2) { %}
//       //   <div className="test ttt"></div>  
//       // {% } else { %}
//       //   <div className="test ttt"></div>  
//       // {% } %}`

//       // `<PageColumn>
//       // {% if (1 < 2) { %}
//       //   <div className="test ttt">
//       //     <ButtonMain text='Chat ' onClick={{state.func}} > </ButtonMain>
//       //   </div>  
//       // {% } else { %}
//       //   <div className="test ttt">
//       //     <ButtonSecondary text='Chat '> </ButtonSecondary>
//       //   </div>  
//       // {% } %}
//       // </PageColumn>`

// )

//   }

}

// const root: HTMLElement | null = document.querySelector(".app")
// const app: App = new App()
// app.render(root)

// const router: Router = new Router('.app')

// router.use('/login', Login)

// console.log(router)
