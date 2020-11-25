import Component from '../../../../component/component'

class MessagesBar__Header extends Component {

  template() { 
    return (
      `<div className="messages-bar__header">
        
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
      
      </div>`
      
    )
  }

}

export default MessagesBar__Header