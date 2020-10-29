import Component from "../../component/component.js"

class AuthBarInput extends Component {

  template() { 
    return (
      `<div class="auth-bar-input">
        <label class="auth-bar-input__label" for="auth-bar-input__input">{{props.text}}</label>
        <input class="auth-bar-input__input" type={{props.type}} id={{props.id}}></input>
      </div>
      `
    )
  }

}

export default AuthBarInput