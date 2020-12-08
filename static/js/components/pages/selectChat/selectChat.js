//#Import
import MessagesBarSelect from '../../../components/chat/messages-bar/messages-bar-select/messages-bar-select.js'
import ChatsBar from '../../../components/chat/chats-bar/chats-bar/chats-bar.js'
//#Import
import Component from '../../../component/component.js';
export default class SelectChat extends Component {
    //#Components
components() {return {ChatsBar,MessagesBarSelect}}
//#Components
template() {
        return (`<div className='page-chat'>
        <ChatsBar></ChatsBar>
        <MessagesBarSelect></MessagesBarSelect>      
      </div>`);
    }
}
//# sourceMappingURL=selectChat.js.map