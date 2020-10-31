import Component from '../../../component/component.js'
import UsersList__UserItem from './users-list__user-item.js'
//import InputGray5 from '../UI/inputs/input-gray5.js'

class UsersBar__UsersList extends Component {

  components() {return {UsersList__UserItem}}

  template() { 
    return (
      `<div class="users-bar__users-list">
        <ul class="users-list__list">
          <UsersList__UserItem></UsersList__UserItem>
          <UsersList__UserItem></UsersList__UserItem>
          <UsersList__UserItem></UsersList__UserItem>
          <UsersList__UserItem></UsersList__UserItem>
          <UsersList__UserItem></UsersList__UserItem>
        </ul>
      </div>`
    )
  }

}

export default UsersBar__UsersList