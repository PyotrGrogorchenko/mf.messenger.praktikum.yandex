import Component from '../../../component/component.js';
class AuthBarInput extends Component {
    template() {
        return (`<div className='auth-bar-input'>
        <label className='auth-bar-input__label' for={{props.id}}>{{props.text}}</label>
        <input className='auth-bar-input__input' type={{props.type}} id={{props.id}} value={{props.value}}></input>
      </div>`);
    }
}
export default AuthBarInput;
//# sourceMappingURL=auth-bar-input.js.map