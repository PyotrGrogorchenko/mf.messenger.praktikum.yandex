import Component from '../../../../../component/component.js';
class Message__Outgoing extends Component {
    template() {
        return (`<div className='message__free-space'>
      </div>
      <div className='message__outgoing'>
        <div className='message__decor bg-gy5'>
          {{props.text}}  
          <span className='message__info'>
            <i className='color-gray2 fas fa-check-double'></i>
            {{props.date}}
          </span>
        </div>
      </div>`);
    }
}
export default Message__Outgoing;
//# sourceMappingURL=message__outgoing.js.map