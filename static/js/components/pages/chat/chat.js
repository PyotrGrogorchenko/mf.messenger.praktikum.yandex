//#Import
import MessagesBar from '../../../components/chat/messages-bar/messages-bar/messages-bar.js'
import MessagesBarSelect from '../../../components/chat/messages-bar/messages-bar-select/messages-bar-select.js'
import ChatsBar from '../../../components/chat/chats-bar/chats-bar/chats-bar.js'
//#Import
import Component from '../../../component/Component.js';
export default class Chat extends Component {
    constructor() {
        // componentDidMount() {
        //   console.log(localStorage.getItem('currentChat'))
        // }
        super(...arguments);
        this.state = {
            func: this.func
        };
    }
    func(e) {
        {
            console.log(e);
        }
    }
    //#Components
components() {return {ChatsBar,MessagesBarSelect,MessagesBar}}
//#Components
template() {
        return (`<div className='page-chat'>
        <ChatsBar></ChatsBar>
        {% if(localStorage.getItem('currentChat') === null) { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } else { %}
          <MessagesBar func={{state.func}}></MessagesBar>
        {% } %}
      </div>`);
    }
}
// <ChatsBar></ChatsBar>
// <MessagesBarSelect></MessagesBarSelect>      
//# sourceMappingURL=chat.js.map