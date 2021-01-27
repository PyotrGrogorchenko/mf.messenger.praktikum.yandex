//#Import
import MessagesBarSelect from '../../../components/chat/messages-bar/messages-bar-select/messages-bar-select.js'
import MessagesBar from '../../../components/chat/messages-bar/messages-bar/messages-bar.js'
import ChatsBar from '../../../components/chat/chats-bar/chats-bar/chats-bar.js'
//#Import
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../../../component/Component.js';
import { WS } from '../../../webSocket/WebSoket.js';
import { xhrPostChatsToken } from '../../../xhr/xhrExecute.js';
export default class Chat extends Component {
    constructor() {
        super(...arguments);
        this.chatid = 0;
        this.token = '';
        this.ws = null;
        this.avatar = '';
        this.title = '';
        this.chatsBar_callback = (data) => __awaiter(this, void 0, void 0, function* () {
            if (data.chat) {
                if (this.chatid === data.chat.id) {
                    return;
                }
                this.chatid = data.chat.id;
                this.avatar = data.chat.avatar;
                this.title = data.chat.title;
                const req = yield xhrPostChatsToken({ id: this.chatid });
                this.token = req === null || req === void 0 ? void 0 : req.response.token;
                this.setState({ showMessages: true, shatid: String(this.chatid), chatid: this.chatid, avatar: this.avatar, title: this.title, token: this.token });
                // const reqChatUsers = await xhrGetChatsUsers({id:data.chat.id}) 
                // console.log('reqChatUsers', reqChatUsers)
                // this.ws = new WS(String(localStorage.getItem('id')), String(this.shatId), this.token)
                // this.ws.onMessage = this.wsOnMessagesGetOld
                // this.ws.onOpen = () => { this.ws?.send('0', 'get old') }
            }
        });
        this.sendMesageOnClick_callback = (message) => __awaiter(this, void 0, void 0, function* () {
            this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token);
            this.ws.onMessage = this.wsOnMessagesSendMessages;
            this.ws.onOpen = () => { var _a; (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(message); };
        });
        this.wsOnMessagesSendMessages = (event) => {
            this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token);
            this.ws.onMessage = this.wsOnMessagesGetOld;
            this.ws.onOpen = () => { var _a; (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send('0', 'get old'); };
        };
        this.wsOnMessagesGetOld = (event) => {
            this.setState({ showMessages: true, id: String(this.chatid), avatar: this.avatar, title: this.title, messages: event.data });
        };
        this.state = {
            chatsBar_callback: this.chatsBar_callback,
            sendMesageOnClick_callback: this.sendMesageOnClick_callback,
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
          <MessagesBar 
            chatid={{state.chatid}} 
            token={{state.token}} 
            avatar={{state.avatar}} 
            title={{state.title}} 
            sendMesageOnClick_callback={{state.sendMesageOnClick_callback}}
          ></MessagesBar>
        {% } else { %}
          <MessagesBarSelect></MessagesBarSelect>
        {% } %}
      </div>`);
    }
}
// <ChatsBar></ChatsBar>
// <MessagesBarSelect></MessagesBarSelect>      
//# sourceMappingURL=chat.js.map