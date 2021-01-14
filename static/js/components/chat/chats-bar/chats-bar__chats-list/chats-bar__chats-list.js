//#Import
import ChatsList__SearchWindow from '../../../../components/chat/chats-bar/chats-list__search-window/chats-list__search-window.js'
import ContextMenu from '../../../../components/UI/context-menu/context-menu.js'
import ChatsList__ChatItem from '../../../../components/chat/chats-bar/chats-list__chat-item/chats-list__chat-item.js'
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
import { HTTPTransport } from '../../../../xhr/HTTPTransport.js';
import { env } from '../../../../const/index.js';
class ChatsBar__ChatsList extends Component {
    constructor() {
        super(...arguments);
        this.CM_onClick = (data) => {
            if (data.btnId === 'add') {
                this.addChat_event();
            }
            else if (data.btnId === 'remove') {
                this.removeChat_event(data);
            }
        };
        this.removeChat_event = (data) => {
            let chatid = '';
            for (let i = 0; i < data.targetPath.length; i++) {
                let el = data.targetPath[i];
                if (el.classList && el.classList.contains('chats-list__chat-item')) {
                    chatid = el.getAttribute('chatid');
                    break;
                }
            }
            if (!chatid) {
                return;
            }
            console.log('removeUser', this.state.showUsers);
            let chats = this.state.chats.filter((item) => item.id !== chatid);
            this.setState({ chats });
        };
        this.addChat_event = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showUsers: true });
            // const httpTransport = new HTTPTransport()
            // const req = await httpTransport.post(`${env.URL_REQUEST}/user/search`, 
            //     {
            //       withCredentials: true,
            //       headers: {'content-type': 'application/json'},
            //       data: {login: 'string'}
            //     }) as XMLHttpRequest
            // console.log('getChats', req)
        });
        this.addChat_Callback = (chat) => __awaiter(this, void 0, void 0, function* () {
            this.setState({ showUsers: false });
            if (chat) {
                yield this.putChat(chat);
            }
        });
        this.state = {
            chats1: this.getChats(),
            CM_onClick: this.CM_onClick,
            chatsOnClick: this.chatsOnClick,
            addChat_Callback: this.addChat_Callback,
            showUsers: false,
            chats: [
            // {id: '1', name: 'Sasha', countUnread: 10, lastMessage: {type: 'in',  date: '13:15', text: 'Putting the page number in the middle of the wording is a bad idea'}},
            // {id: '2', name: 'Timur', countUnread: 500, lastMessage: {type: 'in',  date: '22:14', text: 'It was snapped off at the handle, and the blade was splintered, like somebody used it to hit something hard.'}},
            // {id: '3', name: 'Lena',  countUnread: 12, lastMessage: {type: 'out', date: '02:14', text: 'Barbie saw one of the rotors break off.'}},
            // {id: '4', name: 'Vika',  countUnread: 0, lastMessage: {type: 'out', date: '17:14', text: 'The Swiss Guard chopper churned in neutral as Langdon and Vittoria approached.'}},
            // {id: '5', name: 'Ruprt', countUnread: 3, lastMessage: {type: 'in',  date: '20:19', text: 'Putting the page number in the middle of the wording is a bad idea,'}}
            ]
        };
    }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            const httpTransport = new HTTPTransport();
            const req = yield httpTransport.get(`${env.URL_REQUEST}/chats`, { withCredentials: true, headers: { 'content-type': 'application/json' } });
            //console.log('getChats', req)
        });
    }
    putChat(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   const httpTransport = new HTTPTransport()
            //   const req = await httpTransport.put(`${env.URL_REQUEST}/chats/users`, 
            //       { withCredentials: true,
            //         headers: {'content-type': 'application/json'},
            //         data: {login: }
            //       }) as XMLHttpRequest
            // } catch (error) {
            //   console.error(error)      
            // }
        });
    }
    chatsOnClick(e) {
        e.preventDefault();
        //let li: Array<HTMLElement> = e.path.filter((el: HTMLElement) => el.nodeName === 'LI')
        //console.log('chatsOnClick')
        // if (!li) {
        //   return
        // }
    }
    //#Components
components() {return {ChatsList__ChatItem,ContextMenu,ChatsList__SearchWindow}}
//#Components
template() {
        return (`
      <div className='chats-bar__chats-list' onClick={{state.chatsOnClick}} id='chats-list'>


        <ul className='chats-list__list'>
          
          {% for (let i = 0; i < state.chats.length; i++) { const chat = state.chats[i]; %}
            <ChatsList__ChatItem 
              chatid={{chat.id}}
              key={{chat.id}}
              name={{chat.name}}
              lastMessageType={{chat.lastMessage.type}}
              lastMessageDate={{chat.lastMessage.date}}
              lastMessageText={{chat.lastMessage.text}}
              countUnread={{chat.countUnread}}
            ></ChatsList__ChatItem>
          {% } %}
        </ul>

      </div>

      <ContextMenu 
        buttons='addChat:add:Add chat|removeChat:remove:Remove chat|addUser:add:Add user|removeUser:remove:Remove user'
        blockButtons='addChat|removeChat'
        onClick={{state.CM_onClick}}
        ownerId='chats-list'
        menuId='chats-list-context-menu'
      ></ContextMenu>
  
      <ChatsList__SearchWindow show={{state.showUsers}} callback={{state.addChat_Callback}}></ChatsList__SearchWindow>

      `);
    }
}
export default ChatsBar__ChatsList;
//# sourceMappingURL=chats-bar__chats-list.js.map