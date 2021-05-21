//#Import
import Message__FreeSpace from '../../../../../components/chat/messages-bar/message/message__free-space/message__free-space.js'
//#Import
import Component from '../../../../../component/Component.js';
class Message__Incoming extends Component {
    //#Components
components() {return {Message__FreeSpace}}
//#Components
template() {
        return (`<div className='message__incoming'>
        <div className='message__decor bg-gy4'>
          {{props.text}} 
        <span className='message__info'>
          <i className='hide color-gray2 fas fa-check-double'></i>
          <p>{{props.date}}</p>
        </span>
        </div>
          
        <Message__FreeSpace></Message__FreeSpace>
        
      </div>`);
    }
}
export default Message__Incoming;
//# sourceMappingURL=message__incoming.js.map