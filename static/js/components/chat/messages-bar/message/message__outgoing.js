import Component from '../../../../component/component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import Message__FreeSpace from './message__free-space.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
class Message__Outgoing extends Component {
    components() { return { Message__FreeSpace }; }
    template() {
        return (`<div className="message__free-space">
      </div>
      <div className="message__outgoing">
        <div className="message__decor background-gray5">
          {{props.text}}  
          <span className="message__info">
            <i className="color-gray2 fas fa-check-double"></i>
            {{props.date}}
          </span>
        </div>
      </div>`);
    }
}
export default Message__Outgoing;
//# sourceMappingURL=message__outgoing.js.map