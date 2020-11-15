import Component from './component/component.js';
import PageColumn from './components/page-column.js';
import BarHeader from './components/auth-bar/bar__header.js';
import BarContent from './components/auth-bar/bar__content.js';
import AuthBarInput from './components/auth-bar/auth-bar-input.js';
import BarFooter from './components/auth-bar/bar__footer.js';
import ButtonMain from './components/UI/buttons/button-main.js';
import ButtonSecondary from './components/UI/buttons/button-secondary.js';
import Message__Incoming from './components/chat/messages-bar/message/message__incoming.js';
import Message__Outgoing from './components/chat/messages-bar/message/message__outgoing.js';
export default class Index extends Component {
    components() {
        return { PageColumn, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary,
            Message__Incoming, Message__Outgoing };
    }
    func(e) {
        {
            console.log(e);
        }
    }
    state() {
        return {
            func: this.func
        };
    }
    //   state() {return {
    //     messages: 
    //     [
    //       {incoming: true, date: '22:14', text: 'Putting the page number in the middle of the wording is a bad idea,'}
    //     ]
    //   }}
    template() {
        return (`<PageColumn>
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
        );
    }
}
// const root: HTMLElement | null = document.querySelector(".app")
// const app: App = new App()
// app.render(root)
// const router: Router = new Router('.app')
// router.use('/login', Login)
// console.log(router)
//# sourceMappingURL=index.js.map