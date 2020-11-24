import Component from '../../../../component/component.js.js.js.js.js';
import Message__FreeSpace from './message__free-space.js.js.js.js.js';
class Message__Incoming extends Component {
    components() { return { Message__FreeSpace }; }
    template() {
        return (`<div className="message__incoming">
        <div className="message__decor background-gray4">
          {{props.text}} 
        <span className="message__info">
          <i className="hide color-gray2 fas fa-check-double"></i>
          {{props.date}} 
        </span>
        </div>
          
        <Message__FreeSpace></Message__FreeSpace>
        
      </div>`);
    }
}
export default Message__Incoming;
//# sourceMappingURL=message__incoming.js.map