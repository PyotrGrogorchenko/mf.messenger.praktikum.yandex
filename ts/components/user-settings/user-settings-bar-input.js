import Component from '../../component/component.js'

class UserSettingsBarInput extends Component {

  template() { 
    return (
      `<div class="user-settings-bar-input">
        <label class="user-settings-bar-input__label" for="user-settings-bar-input__input">{{props.text}}</label>
        <input class="user-settings-bar-input__input" type={{props.type}} id={{props.id}}>
      </div>`
      
    )
  }

}

export default UserSettingsBarInput