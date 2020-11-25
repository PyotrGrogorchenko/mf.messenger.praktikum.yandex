import Component from '../../../../../component/component'

class Message__Incoming extends Component {

  template() { 
    return (
      `<div className="message__incoming">
        <div className="message__decor background-gray4">
          {{props.text}} 
        <span className="message__info">
          <i className="hide color-gray2 fas fa-check-double"></i>
          {{props.date}} 
        </span>
        </div>
          
        <Message__FreeSpace></Message__FreeSpace>
        
      </div>`
    )
  }

}

export default Message__Incoming