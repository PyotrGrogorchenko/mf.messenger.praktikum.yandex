import Component from '../../../component/component.js'
//import ButtonToGo from '../UI/buttons/button-to-go.js'
//import InputGray5 from '../UI/inputs/input-gray5.js'

class UsersList__UserItem extends Component {

  //components() {return {ButtonToGo, InputGray5}}

  template() { 
    
    console.log('UsersList__UserItem', this.getProps())

    return (
      `<li class="users-list__user-item">
        <div class="user-item__avatar">
          <div class="avatar">
            <i class="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        <div class="user-item__content">
          <div class="user-item__content-top">
            <h4 class="user-item__username">{{props.name}}</h4>
            <div class="user-item__last-message-time">
              <span class="last-message-time__value">{{props.lastMessageDate}}</span>
            </div>
          </div>    
          <div class="user-item__content-bottom">
            <div class="user-item__last-message">
              {% if (props.lastMessageType === 'out') { %}
                <b>You:</b>
              {% } %}
              <div class="last-message__value">{{props.lastMessageText}}</div>
            </div>
            {% if (props.counUread > 0) { %}
              <div class="user-item__count-message">
                <a class="count-message__value">{{props.counUread}}</a>
              </div>
            {% } %}
          </div>    
        </div>
      </li>
`
    )
  }

}

export default UsersList__UserItem