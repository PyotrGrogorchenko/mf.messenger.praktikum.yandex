import Component from '../../../component/component'
import AnchorToGo from '../../UI/anchors/anchor-to-go'
import InputGray5 from '../../UI/inputs/input-gray5'
import UsersBar__UsersList from '../users-bar__users-list/users-bar__users-list'

class UsersBar extends Component {

  components() {return {AnchorToGo, InputGray5, UsersBar__UsersList}}

  template() { 
    return (
      `<div className="users-bar">
        <form id="form__header" className="users-bar_header">
          <AnchorToGo></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <UsersBar__UsersList></UsersBar__UsersList>
      </div>`
    )
  }

}

export default UsersBar