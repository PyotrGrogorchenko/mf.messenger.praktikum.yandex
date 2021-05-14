//#Import
import MessagesBar__Footer from '../../../../components/chat/messages-bar/messages-bar__footer/messages-bar__footer.js'
import MessagesBar__Messages from '../../../../components/chat/messages-bar/messages-bar__messages/messages-bar__messages.js'
import MessagesBar__Header from '../../../../components/chat/messages-bar/messages-bar__header/messages-bar__header.js'
//#Import
import Component from '../../../../component/Component.js';
import { WS } from '../../../../webSocket/WebSoket.js';
class MessagesBar extends Component {
    constructor() {
        super(...arguments);
        this.chatid = 0;
        this.token = '';
        this.ws = null;
        this.avatar = '';
        this.title = '';
        this.userid = '';
        this.messages = [];
        this.wsOnMessagesGetOld = (event) => {
            const messages = JSON.parse(event.data);
            this.messages = [];
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i];
                const id = message.id ? message.id : '';
                const type = String(message.user_id) === this.userid ? 'out' : 'in';
                this.messages.unshift({ id: messages.length - i, type, date: this.formatDate(message.time), text: message.content });
            }
            this.setState({ messages: this.messages });
        };
        this.sendMessage_onClik = (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const input = document.getElementById('input_send-message');
            const value = input.value.trim();
            input.value = '';
            if (!value) {
                return;
            }
            this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token);
            this.ws.onMessage = this.wsOnMessagesSendMessages;
            this.ws.onOpen = () => {
                var _a;
                (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(value);
            };
        };
        this.wsOnMessagesSendMessages = (event) => {
            this.updatePage(this.getProps());
        };
        this.state = {
            sendMessage_onClik: this.sendMessage_onClik,
            messages: this.messages
        };
    }
    componentDidMount(props) {
        this.updatePage(props);
        setInterval(() => this.updatePage(this.getProps()), 5000);
    }
    componentDidUpdate(oldProps, props) {
        if (props.chatid === this.chatid) {
            return;
        }
        this.updatePage(props);
    }
    updatePage(props) {
        this.chatid = props.chatid;
        this.avatar = props.avatar;
        this.title = props.title;
        this.token = props.token;
        this.userid = localStorage.getItem('id');
        this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token);
        this.ws.onMessage = this.wsOnMessagesGetOld;
        this.ws.onOpen = () => { var _a; (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send('0', 'get old'); };
    }
    formatDate(date) {
        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return new Date(date).toLocaleString("ru", options);
    }
    //#Components
components() {return {MessagesBar__Header,MessagesBar__Messages,MessagesBar__Footer}}
//#Components
template() {
        return (`<div className='messages-bar'>
        <MessagesBar__Header title={{props.title}} id={{props.chatid}} avatar={{props.avatar}}></MessagesBar__Header>
        <MessagesBar__Messages messages={{state.messages}}></MessagesBar__Messages> 
        <MessagesBar__Footer sendMessage_onClik={{state.sendMessage_onClik}}></MessagesBar__Footer>
      </div>`);
    }
}
export default MessagesBar;
//# sourceMappingURL=messages-bar.js.map