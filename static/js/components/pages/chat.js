import Component from '../../component/component.js';
import UsersBar from '../chat/users-bar/users-bar.js';
import MessagesBar from '../chat/messages-bar/messages-bar.js';
import PageId from '../pageId.js';
export default class Chat extends Component {
    components() { return { UsersBar, MessagesBar, PageId }; }
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
        return (`<PageId pageId='chat'></PageId>
      <div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBar func={{state.func}}></MessagesBar>
      </div>`);
    }
}
//# sourceMappingURL=chat.js.map