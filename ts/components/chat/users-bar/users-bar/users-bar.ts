import Component from '../../../../component/component'

class UsersBar extends Component {

  template() { 
    return (
      `<div className="users-bar">
        <form id="form__header" className="users-bar__header">
          <AnchorToGo></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <UsersBar__UsersList></UsersBar__UsersList>
      </div>`
    )
  }

}

export default UsersBar