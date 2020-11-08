import Component from '../../../component/component.js';
class MessagesBar__Footer extends Component {
    template() {
        return (`<form id="form__footer" className="messages-bar__footer">
        <button className="button-round background-white" onClick={{props.func}}>
          <i className="color-gray3 fas fa-paperclip"></i>
        </button>
        <div className="input-gray5">
          <input className="input-gray5__input" type="search" id="input_send-message" placeholder="Write...">
        </div>
        <button className="button-round background-blue1 margin5px" onClick={{props.func}}>
          <i className="color-white fas fa-long-arrow-alt-right"></i>
        </button>
      </form>`);
    }
}
export default MessagesBar__Footer;
//# sourceMappingURL=messages-bar__footer.js.map