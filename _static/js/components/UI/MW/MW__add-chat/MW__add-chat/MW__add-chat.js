//#Import
import ButtonSecondary from '../../../../../components/UI/buttons/button-secondary/button-secondary.js'
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
class MW__AddChat extends Component {
    constructor() {
        super(...arguments);
        this.button_addChatOnClick = (e) => __awaiter(this, void 0, void 0, function* () {
            this.getProps().callback({ title: document.getElementById('chat-title').value });
        });
        this.onClose = () => {
            this.getProps().callback();
        };
        this.state = {
            onClose: this.onClose,
            button_addChatOnClick: this.button_addChatOnClick
        };
    }
    //#Components
components() {return {MW,InputGray5,ButtonSecondary}}
//#Components
template() {
        return (`{% if({{props.showAddChat}}) { %}
        <MW title='Add chat' callback={{state.onClose}}>
          <InputGray5 id='chat-title' title='Title'></InputGray5>
          <div className='add-chat_buttons'> 
            <ButtonSecondary text='Add' id='button_add-chat' onClick={{state.button_addChatOnClick}}></ButtonSecondary>
          </div>  
        </MW>
      {% } %}`);
    }
}
export default MW__AddChat;
//# sourceMappingURL=MW__add-chat.js.map