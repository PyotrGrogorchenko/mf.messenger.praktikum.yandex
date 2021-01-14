//#Import
import SearchWindow__SearchItem from '../../../../components/chat/chats-bar/search-window__search-item/search-window__search-item.js'
import InputGray5 from '../../../../components/UI/inputs/input-gray5/input-gray5.js'
import ModalWindow from '../../../../components/UI/modal-window/modal-window.js'
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
import { env } from '../../../../const/index.js';
import { HTTPTransport } from '../../../../xhr/HTTPTransport.js';
class ChatsList__SearchWindow extends Component {
    constructor() {
        super(...arguments);
        this.search_onChange = (e) => __awaiter(this, void 0, void 0, function* () {
            this.setState(this.getChats(e.target.value));
            yield this.getChats();
        });
        this.onClose = () => {
            this.state.chats = [];
            this.getProps().callback();
        };
        this.item_callback = (id) => {
            let chat = null;
            for (let i = 0; i < this.state.chats.length; i++) {
                if (String(this.state.chats[i].id) === id) {
                    chat = this.state.chats[i];
                    break;
                }
            }
            this.state.chats = [];
            this.getProps().callback(chat);
        };
        this.state = {
            onClose: this.onClose,
            item_callback: this.item_callback,
            chats: [],
            search_onChange: this.search_onChange
        };
    }
    getChats(searchString = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchString === '') {
                return;
            }
            const httpTransport = new HTTPTransport();
            const req = yield httpTransport.post(`${env.URL_REQUEST}/user/search`, {
                withCredentials: true,
                headers: { 'content-type': 'application/json' },
                data: { login: searchString }
            });
            console.log(req.response);
            this.setState({ chats: req.response });
        });
    }
    //#Components
components() {return {ModalWindow,InputGray5,SearchWindow__SearchItem}}
//#Components
template() {
        return (`{% if({{props.show}}) { %}
        <ModalWindow title='Search users' callback={{state.onClose}}>
          <div className='search-window__selections'>
            <InputGray5 onChange={{state.search_onChange}}></InputGray5>
          </div> 
          
          <div className='search-window__list'>
            <ul className='chats-list__list'>
            
              {% for (let i = 0; i < state.chats.length; i++) { const chat = state.chats[i]; %}
                <SearchWindow__SearchItem 
                  id={{chat.id}} 
                  key={{chat.id}}
                  avatar={{chat.avatar}} 
                  login={{chat.login}}
                  callback={{state.item_callback}}
                ></SearchWindow__SearchItem>
              {% } %}
            
            </ul>
          </div> 
        </ModalWindow>
      {% } %}`);
    }
}
export default ChatsList__SearchWindow;
//# sourceMappingURL=chats-list__search-window.js.map