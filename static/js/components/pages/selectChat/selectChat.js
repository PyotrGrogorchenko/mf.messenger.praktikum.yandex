//#Import
import MessagesBarSelect from '../../../components/chat/messages-bar/messages-bar-select/messages-bar-select.js'
import UsersBar from '../../../components/chat/users-bar/users-bar/users-bar.js'
//#Import
import Component from '../../../component/component.js';
export default class SelectChat extends Component {
    //#Components
components() {return {UsersBar,MessagesBarSelect}}
//#Components
template() {
        return (`<div className="page-chat">
        <UsersBar></UsersBar>
        <MessagesBarSelect></MessagesBarSelect>      
      </div>`);
    }
}
//# sourceMappingURL=selectChat.js.map