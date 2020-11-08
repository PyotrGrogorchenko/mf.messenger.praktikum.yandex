import Component from './component/component.js';
import PageColumn from './components/page-column.js';
import FormMain from './components/chat/auth-bar/form__main.js';
import BarHeader from './components/auth-bar/bar__header.js';
import BarContent from './components/auth-bar/bar__content.js';
import AuthBarInput from './components/auth-bar/auth-bar-input.js';
import BarFooter from './components/auth-bar/bar__footer.js';
import ButtonMain from './components/UI/buttons/button-main.js';
import ButtonSecondary from './components/UI/buttons/button-secondary.js';
import Message__Incoming from './components/chat/messages-bar/message/message__incoming.js';
import Message__Outgoing from './components/chat/messages-bar/message/message__outgoing.js';
class App extends Component {
    components() {
        return { PageColumn, FormMain, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary,
            Message__Incoming, Message__Outgoing };
    }
    //   // func (e) {
    //   //   { console.log(e) }  
    //   // }
    //   // state() {return {
    //   //   func: this.func 
    //   // }}
    //   state() {return {
    //     messages: 
    //     [
    //       {incoming: true, date: '22:14', text: 'Putting the page number in the middle of the wording is a bad idea,'}
    //     ]
    //   }}
    template() {
        return (`<PageColumn>
        <div>Messanger</div>
      </PageColumn>`);
    }
}
const root = document.querySelector(".app");
const app = new App();
app.render(root);
//# sourceMappingURL=index.js.map