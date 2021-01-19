//#Import
import MessagesBarSelect from '../../../components/chat/messages-bar/messages-bar-select/messages-bar-select.js'
import MessagesBar from '../../../components/chat/messages-bar/messages-bar/messages-bar.js'
import ChatsBar from '../../../components/chat/chats-bar/chats-bar/chats-bar.js'
//#Import
import Component from '../../../component/Component.js';
export default class Chat extends Component {
    constructor() {
        super(...arguments);
        this.currentId = 0;
        this.chatsBar_callback = (data) => {
            if (data.user) {
                if (this.currentId === data.user.id) {
                    return;
                }
                this.currentId === data.user.id;
                this.setState({ showMessages: true, id: String(data.user.id), avatar: data.user.avatar, title: data.user.title });
            }
        };
        this.state = {
            chatsBar_callback: this.chatsBar_callback,
            showMessages: false
        };
    }
    componentDidUpdate() {
        window.createValidateEvents();
    }
    //#Components
components() {return {ChatsBar,MessagesBar,MessagesBarSelect}}
//#Components
template() {
        return (`<div className='page-chat'>
        <ChatsBar callback={{state.chatsBar_callback}}></ChatsBar>
        {% if({{state.showMessages}}) { %}
          <MessagesBar id={{state.id}} avatar={{state.avatar}} title={{state.title}}></MessagesBar>
        {% } else { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } %}
      </div>`);
    }
}
// <ChatsBar></ChatsBar>
// <MessagesBarSelect></MessagesBarSelect>      
//# sourceMappingURL=chat.js.map