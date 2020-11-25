import Component from '../../component/component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import UsersBar from '../chat/users-bar/users-bar.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import MessagesBar from '../chat/messages-bar/messages-bar.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
export default class Chat extends Component {
    components() { return { UsersBar, MessagesBar }; }
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
    template() {
        return (`<div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBar func={{state.func}}></MessagesBar>
      </div>`);
    }
}
//# sourceMappingURL=chat.js.map