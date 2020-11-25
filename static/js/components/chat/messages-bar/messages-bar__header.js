import Component from '../../../component/component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
// import ButtonToGo from '../../UI/buttons/button-to-go.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js'
// import InputGray5 from '../../UI/inputs/input-gray5.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js'
// import UsersBar__UsersList from './users-bar__users-list.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js'
class MessagesBar__Header extends Component {
    //components() {return {ButtonToGo, InputGray5, UsersBar__UsersList}}
    template() {
        return (`<div className="messages-bar__header">
        
        <div className="header__avatar">
          <div className="avatar">
            <i className="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        
        <div className="header__content">
          <div className="header__username">
            <h1>{{props.name}}</h1>
          </div>
          <div className="header__last-seen">
            {{props.lastSeen}}
          </div>
        </div>
        
        <div className="header__menu">
          <button className="button-vertical background-white">
            <i className="fas fa-ellipsis-v"></i>
          </button>  
        </div>
      
      </div>`);
    }
}
export default MessagesBar__Header;
//# sourceMappingURL=messages-bar__header.js.map