import Component from '../../../component/Component.js';
class UserSettingsBarInput extends Component {
    template() {
        return (`<div className='user-settings-bar-input'>
        <label className='user-settings-bar-input__label' for='user-settings-bar-input__input'>{{props.text}}</label>
        <input className='user-settings-bar-input__input' type={{props.type}} id={{props.id}} value={{props.value}}>
      </div>`);
    }
}
export default UserSettingsBarInput;
//# sourceMappingURL=user-settings-bar-input.js.map