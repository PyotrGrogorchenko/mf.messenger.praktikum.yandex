var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../../../component/component.js';
import { HTTPTransport } from '../../../xhr/HTTPTransport.js';
import UsersList__UserItem from './users-list__user-item.js';
//import InputGray5 from '../UI/inputs/input-gray5.js'
import { env } from '../../../const/index.js';
class UsersBar__UsersList extends Component {
    components() { return { UsersList__UserItem }; }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            const httpTransport = new HTTPTransport();
            const req = yield httpTransport.get(`${env.URL_REQUEST}/chats`, { withCredentials: true, headers: { 'content-type': 'application/json' } });
            console.log(req);
        });
    }
    state() {
        return {
            users1: this.getChats(),
            users: [
                { name: 'Sasha', counUread: 10, lastMessage: { type: 'in', date: '13:15', text: 'Putting the page number in the middle of the wording is a bad idea' } },
                { name: 'Timur', counUread: 500, lastMessage: { type: 'in', date: '22:14', text: 'It was snapped off at the handle, and the blade was splintered, like somebody used it to hit something hard.' } },
                { name: 'Lena', counUread: 12, lastMessage: { type: 'out', date: '02:14', text: 'Barbie saw one of the rotors break off.' } },
                { name: 'Vika', counUread: 0, lastMessage: { type: 'out', date: '17:14', text: 'The Swiss Guard chopper churned in neutral as Langdon and Vittoria approached.' } },
                { name: 'Ruprt', counUread: 3, lastMessage: { type: 'in', date: '20:19', text: 'Putting the page number in the middle of the wording is a bad idea,' } }
            ]
        };
    }
    template() {
        return (`<div className="users-bar__users-list">
        <ul className="users-list__list">
          
          {% for (let i = 0; i < state.users.length; i++) { 
            const user = state.users[i];
          %}
            <UsersList__UserItem 
              name={{user.name}}
              lastMessageType={{user.lastMessage.type}}
              lastMessageDate={{user.lastMessage.date}}
              lastMessageText={{user.lastMessage.text}}
              counUread={{user.counUread}}
            ></UsersList__UserItem>
          {% } %}
         </ul>
      </div>`);
    }
}
export default UsersBar__UsersList;
//# sourceMappingURL=users-bar__users-list.js.map