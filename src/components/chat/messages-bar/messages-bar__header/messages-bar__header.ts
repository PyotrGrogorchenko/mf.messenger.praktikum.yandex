import Component from '../../../../component/Component/Component'

class MessagesBar__Header extends Component {
  template() {
    return (
      `<div className='messages-bar__header' id={{props.id}}>
        
        <div className='header__avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>

          // <div className='avatar-empty'>
          //   <i className='c-gy3 fas fa-camera'></i>
          // </div>
        </div>
        
        <div className='header__content'>
          <div className='header__username'>
            <h1>{{props.title}}</h1>
          </div>
          <div className='header__last-seen'>
            {{props.lastSeen}}
          </div>
        </div>
        
        <div className='header__menu'>
          // <button className='button-vertical bg-w'>
          //   <i className='fas fa-ellipsis-v'></i>
          // </button>  
        </div>
      
      </div>`

    )
  }
}

export default MessagesBar__Header
