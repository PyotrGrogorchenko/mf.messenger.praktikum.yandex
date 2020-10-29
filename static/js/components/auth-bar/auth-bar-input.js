import Block from "../../component/block.js"

class AuthBarInput extends Block {

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