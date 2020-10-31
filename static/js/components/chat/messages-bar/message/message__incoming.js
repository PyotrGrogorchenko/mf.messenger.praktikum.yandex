import Component from '../../../../component/component.js'
import Message__FreeSpace from './message__free-space.js'

class Message__Incoming extends Component {

  components() {return {Message__FreeSpace}}

  template() { 
    return (
      `<div className="message__incoming">
        <div className="message__decor background-gray5">
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