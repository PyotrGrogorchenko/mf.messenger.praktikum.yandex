import Component from '../../component/component'

export default class PagesMenu extends Component {

  // func (e:Event) {
  //   { console.log(e) }  
  // }
  // state() {return {
  //   func: this.func 
  // }}

  template() { 

  return  (
    `<PageColumn>
      <nav >
        <a className="main-nav-a" href="#{R}login"          >Login</a>
        <a className="main-nav-a" href="#{R}signup"         >Signup</a>
        <a className="main-nav-a" href="#{R}selectChat"     >SelectChat</a>
        <a className="main-nav-a" href="#{R}chat"           >Chat</a>
        <a className="main-nav-a" href="#{R}error404"       >Error404</a>
        <a className="main-nav-a" href="#{R}error500"       >Error500</a>
        <a className="main-nav-a" href="#{R}userSettings"   >UserSettings</a>
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