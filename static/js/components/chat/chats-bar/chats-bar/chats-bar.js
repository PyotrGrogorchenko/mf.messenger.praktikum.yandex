//#Import
import ChatsBar__ChatsList from '../../../../components/chat/chats-bar/chats-bar__chats-list/chats-bar__chats-list.js'
import InputGray5 from '../../../../components/UI/inputs/input-gray5/input-gray5.js'
import AnchorToGo from '../../../../components/UI/anchors/anchor-to-go/anchor-to-go.js'
//#Import
import Component from '../../../../component/Component.js';
class ChatsBar extends Component {
    //#Components
components() {return {AnchorToGo,InputGray5,ChatsBar__ChatsList}}
//#Components
template() {
        return (`<div className='chats-bar'>
        <form id='form__header' className='chats-bar__header'>
          <AnchorToGo></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <ChatsBar__ChatsList></ChatsBar__ChatsList>
      </div>`);
    }
}
export default ChatsBar;
//# sourceMappingURL=chats-bar.js.map