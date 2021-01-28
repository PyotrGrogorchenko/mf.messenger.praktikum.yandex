//#Import
import MW__AddChat from '../../../../components/UI/MW/MW__add-chat/MW__add-chat/MW__add-chat.js'
import MW__SearchUser from '../../../../components/UI/MW/MW__search-user/MW__search-user/MW__search-user.js'
import ContextMenu from '../../../../components/UI/context-menu/context-menu.js'
import ChatsList__ChatItem from '../../../../components/chat/chats-bar/chats-list__chat-item/chats-list__chat-item/chats-list__chat-item.js'
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
import Component from '../../../../component/Component.js';
import { xhrPostCreateChat, xhrGetChats, xhrOnError, xhrPutChatUsers } from '../../../../xhr/xhrExecute.js';
class ChatsBar__ChatsList extends Component {
    constructor() {
        super(...arguments);
        this.currentChatId = 0;
        this.chatsOnClick = (e) => {
            e.preventDefault();
            let arrli = e.path.filter((el) => el.nodeName === 'LI');
            if (arrli.length === 0) {
                return;
            }
            let elLi = arrli[0];
            let chatId = null;
            if (elLi) {
                chatId = elLi.getAttribute('id');
            }
            this.currentChatId = Number(chatId);
            if (chatId !== null) {
                const arrChats = this.state.chats.filter((el) => String(el.id) === chatId);
                if (arrChats.length > 0) {
                    this.getProps().callback({ chat: arrChats[0] });
                }
            }
        };
        this.CM_onClick = (data) => {
            if (data.btnId === 'addUser') {
                this.addUser_event(data);
            }
            else if (data.btnId === 'removeUser') {
                this.removeUser_event(data);
            }
            else if (data.btnId === 'addChat') {
                this.addChat_event(data);
            }
            else if (data.btnId === 'removeChat') {
                this.removeChat_event(data);
            }
        };
        this.addUser_event = (data) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showSearchUsers: true });
        });
        this.removeUser_event = (data) => {
        };
        this.searchUsers_callback = (user) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showSearchUsers: false });
            if (!user)
                return;
            let req = yield xhrPutChatUsers({
                chatId: this.currentChatId,
                users: [user.id]
            });
        });
        this.addChat_event = (data) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showAddChat: true });
        });
        this.removeChat_event = (data) => {
        };
        this.addChat_callback = (data) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showAddChat: false });
            if (!data) {
                return;
            }
            const req = yield xhrPostCreateChat(data);
            if (req && req.status >= 400) {
                alert(`Failed to create chat: ${req.response.error}, ${req.response.reason}`);
                return;
            }
            this.setState({ chats: yield this.getChats() });
        });
        this.chatsOnСontextMenu = (e) => {
            // e.preventDefault()
            // let arrli: Array<HTMLElement> = e.path.filter((el: HTMLElement) => el.nodeName === 'LI')
            // if (arrli.length === 0) { return }
            // let elLi = arrli[0]
            // let chatId: string | null = null
            // if (elLi) { chatId = elLi.getAttribute('id')  }
            // this.currentChatId = Number(chatId as string)
        };
        this.state = {
            CM_onClick: this.CM_onClick,
            chatsOnClick: this.chatsOnClick,
            chatsOnСontextMenu: this.chatsOnСontextMenu,
            showSearchUsers: false,
            searchUsers_callback: this.searchUsers_callback,
            showAddChat: false,
            addChat_callback: this.addChat_callback
        };
    }
    componentDidMount(props, state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ chats: yield this.getChats() });
        });
    }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield xhrGetChats();
            if (!req) {
                return;
            }
            if (req.response.status >= 400) {
                xhrOnError();
            }
            return req.response;
        });
    }
    //#Components
components() {return {ChatsList__ChatItem,ContextMenu,MW__SearchUser,MW__AddChat}}
//#Components
template() {
        return (`
      <div 
        className='chats-bar__chats-list' 
        onClick={{state.chatsOnClick}} 
        oncontextmenu={{state.chatsOnСontextMenu}} 
        id='chats-list'
      >

        <ul className='chats-list__list'>
          
          {% for (let i = 0; i < state.chats.length; i++) { const chat = state.chats[i]; %}
            <ChatsList__ChatItem 
              id={{chat.id}}
              key={{chat.id}}
              name={{chat.title}}
              avatar={{chat.avatar}}
              //markId={{}}
              // lastMessageType={{chat.lastMessage.type}}
              // lastMessageDate={{chat.lastMessage.date}}
              // lastMessageText={{chat.lastMessage.text}}
              // countUnread={{chat.countUnread}}
            ></ChatsList__ChatItem>
          {% } %}
        </ul>

      </div>

      <ContextMenu 
        buttons='addChat:add:Add chat|removeChat:remove:Remove chat|addUser:add:Add user|removeUser:remove:Remove user'
        //blockButtons='addChat|removeChat'
        onClick={{state.CM_onClick}}
        ownerId='chats-list'
        menuId='chats-list-context-menu'
      ></ContextMenu>
  
      <MW__SearchUser showSearchUsers={{state.showSearchUsers}} callback={{state.searchUsers_callback}}></MW__SearchUser>
      <MW__AddChat showAddChat={{state.showAddChat}} callback={{state.addChat_callback}}></MW__AddChat>
      `);
    }
}
export default ChatsBar__ChatsList;
//# sourceMappingURL=chats-bar__chats-list.js.map