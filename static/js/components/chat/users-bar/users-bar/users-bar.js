//#Import
import UsersBar__UsersList from '../../../../components/chat/users-bar/users-bar__users-list/users-bar__users-list.js'
import InputGray5 from '../../../../components/UI/inputs/input-gray5/input-gray5.js'
import AnchorToGo from '../../../../components/UI/anchors/anchor-to-go/anchor-to-go.js'
//#Import
import Component from '../../../../component/component.js';
class UsersBar extends Component {
    //#Components
components() {return {AnchorToGo,InputGray5,UsersBar__UsersList}}
//#Components
template() {
        return (`<div className="users-bar">
        <form id="form__header" className="users-bar__header">
          <AnchorToGo></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <UsersBar__UsersList></UsersBar__UsersList>
      </div>`);
    }
}
export default UsersBar;
//# sourceMappingURL=users-bar.js.map