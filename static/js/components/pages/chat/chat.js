//#Import
import MessagesBar from '../../../components/chat/messages-bar/messages-bar/messages-bar.js'
import UsersBar from '../../../components/chat/users-bar/users-bar/users-bar.js'
//#Import
import Component from '../../../component/component.js';
export default class Chat extends Component {
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
    //#Components
components() {return {UsersBar,MessagesBar}}
//#Components
template() {
        return (`<div className='page-chat'>
        <UsersBar></UsersBar>
        <MessagesBar func={{state.func}}></MessagesBar>
      </div>`);
    }
}
//# sourceMappingURL=chat.js.map