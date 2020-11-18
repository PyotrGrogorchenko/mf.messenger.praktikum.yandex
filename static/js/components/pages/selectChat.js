import Component from '../../component/component.js';
import UsersBar from '../chat/users-bar/users-bar.js';
import MessagesBarSelect from '../chat/messages-bar/messages-bar-select.js';
import PageId from '../pageId.js';
export default class SelectChat extends Component {
    components() { return { UsersBar, MessagesBarSelect, PageId }; }
    template() {
        return (`<PageId pageId='select-chat'></PageId>
      <div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBarSelect></MessagesBarSelect>
      </div>`);
    }
}
//# sourceMappingURL=selectChat.js.map