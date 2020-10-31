import Component from '../../../component/component.js'
//import ButtonToGo from '../UI/buttons/button-to-go.js'
//import InputGray5 from '../UI/inputs/input-gray5.js'

class UsersList__UserItem extends Component {

  //components() {return {ButtonToGo, InputGray5}}

  template() { 
    
    console.log('UsersList__UserItem', this.getProps())

    return (
      `<li className="users-list__user-item">
        <div className="user-item__avatar">
          <div className="avatar">
            <i className="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        <div className="user-item__content">
          <div className="user-item__content-top">
            <h4 className="user-item__username">{{props.name}}</h4>
            <div className="user-item__last-message-time">
              <span className="last-message-time__value">{{props.lastMessageDate}}</span>
            </div>
          </div>    
          <div className="user-item__content-bottom">
            <div className="user-item__last-message">
              {% if (props.lastMessageType === 'out') { %}
                <b>You:</b>
              {% } %}
              <div className="last-message__value">{{props.lastMessageText}}</div>
            </div>
            {% if (props.counUread > 0) { %}
              <div className="user-item__count-message">
                <a className="count-message__value">{{props.counUread}}</a>
              </div>
            {% } %}
          </div>    
        </div>
      </li>`
    )
  }

}

export default UsersList__UserItem