//#Import
import ChatsBar__ChatsList from '../../../../components/chat/chats-bar/chats-bar__chats-list/chats-bar__chats-list.js'
import InputGray5 from '../../../../components/UI/inputs/input-gray5/input-gray5.js'
import AnchorToGo from '../../../../components/UI/anchors/anchor-to-go/anchor-to-go.js'
//#Import
import Component from '../../../../component/Component.js';
class ChatsBar extends Component {
    constructor() {
        super(...arguments);
        this.list_callback = (data) => {
            this.getProps().callback(data);
        };
        this.state = {
            list_callback: this.list_callback
        };
    }
    //#Components
components() {return {AnchorToGo,InputGray5,ChatsBar__ChatsList}}
//#Components
template() {
        return (`<div className='chats-bar'>
        <form id='form__header' className='chats-bar__header'>
          <AnchorToGo text='Profile' href='#{R}userSettings'></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <ChatsBar__ChatsList callback={{state.list_callback}}></ChatsBar__ChatsList>
      </div>`);
    }
}
export default ChatsBar;
//# sourceMappingURL=chats-bar.js.map