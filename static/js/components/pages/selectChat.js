import Component from '../../component/component.js.js.js.js.js';
import UsersBar from '../chat/users-bar/users-bar.js.js.js.js.js';
import MessagesBarSelect from '../chat/messages-bar/messages-bar-select.js.js.js.js.js';
export default class SelectChat extends Component {
    components() { return { UsersBar, MessagesBarSelect }; }
    template() {
        return (`<div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBarSelect></MessagesBarSelect>
      </div>`);
    }
}
//# sourceMappingURL=selectChat.js.map