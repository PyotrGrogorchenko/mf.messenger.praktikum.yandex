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
import { xhrPostChatsToken } from '../../../xhr/xhrExecute.js';
export default class Chat extends Component {
    constructor() {
        super(...arguments);
        this.currentId = 0;
        this.chatsBar_callback = (data) => __awaiter(this, void 0, void 0, function* () {
            if (data.chat) {
                if (this.currentId === data.chat.id) {
                    return;
                }
                this.currentId === data.chat.id;
                let req = yield xhrPostChatsToken({ id: data.chat.id });
                const token = req === null || req === void 0 ? void 0 : req.response.token;
                console.log('userid', localStorage.getItem('id'), 'chatid', data.chat.id, 'token', token);
                console.log('socket', `wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('id')}/${data.chat.id}/${token}`);
                //if (!req) { return }
                //if (req.response.status >= 400) { xhrOnError() }
                //const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>')
                const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${localStorage.getItem('id')}/${data.chat.id}/${token}`);
                socket.addEventListener('open', () => {
                    console.log('Соединение установлено');
                    socket.send(JSON.stringify({
                        content: 'Моё первое сообщение миру!',
                        type: 'message',
                    }));
                });
                socket.addEventListener('close', event => {
                    if (event.wasClean) {
                        console.log('Соединение закрыто чисто');
                    }
                    else {
                        console.log('Обрыв соединения');
                    }
                    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                });
                socket.addEventListener('message', event => {
                    console.log('Получены данные', event);
                    console.log('Получены данные', event.data);
                });
                socket.addEventListener('error', event => {
                    console.log('Ошибка', event);
                });
                this.setState({ showMessages: true, id: String(data.chat.id), avatar: data.chat.avatar, title: data.chat.title });
            }
        });
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