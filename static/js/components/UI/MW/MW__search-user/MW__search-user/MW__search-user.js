//#Import
import SearchUser__Item from '../../../../../components/UI/MW/MW__search-user/search-user__item/search-user__item.js'
import InputGray5 from '../../../../../components/UI/inputs/input-gray5/input-gray5.js'
import MW from '../../../../../components/UI/MW/MW/MW.js'
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
import Component from '../../../../../component/Component.js';
import { xhrPostUsersSearh, xhrOnError } from '../../../../../xhr/xhrExecute.js';
class MW__SearchUser extends Component {
    constructor() {
        super(...arguments);
        this.search_onChange = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            e.stopPropagation();
            yield this.getUsers(e.target.value);
        });
        this.search_onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        this.onClose = () => {
            this.state.users = [];
            this.getProps().callback();
        };
        this.item_callback = (id) => {
            let chat = null;
            for (let i = 0; i < this.state.users.length; i++) {
                if (String(this.state.users[i].id) === id) {
                    chat = this.state.users[i];
                    break;
                }
            }
            this.state.users = [];
            this.getProps().callback(chat);
        };
        this.state = {
            users: [],
            onClose: this.onClose,
            item_callback: this.item_callback,
            search_onChange: this.search_onChange
        };
    }
    getUsers(searchString = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchString === '') {
                this.state.users = [];
                this.setState({ users: [] });
                return;
            }
            const req = yield xhrPostUsersSearh(searchString);
            if (!req) {
                return;
            }
            if (req.response.status >= 400) {
                xhrOnError();
            }
            this.setState({ users: req.response });
        });
    }
    //#Components
components() {return {MW,InputGray5,SearchUser__Item}}
//#Components
template() {
        return (`{% if({{props.showSearchUsers}}) { %}
        <MW title='Search users' callback={{state.onClose}}>

          <InputGray5 onChange={{state.search_onChange}} id='input_search-users' ></InputGray5>
          
          <div className='MW__list'>
            <ul className='users-list__list'>
            
              {% for (let i = 0; i < state.users.length; i++) { const chat = state.users[i]; %}
                <SearchUser__Item 
                  id={{chat.id}} 
                  key={{chat.id}}
                  avatar={{chat.avatar}} 
                  login={{chat.login}}
                  callback={{state.item_callback}}
                ></SearchUser__Item>
              {% } %}
            
            </ul>
          </div> 
        </MW>
      {% } %}`);
    }
}
export default MW__SearchUser;
//# sourceMappingURL=MW__search-user.js.map