import { Component } from '@Component'

export class InputMain extends Component {
  template() {
    return (
      `<div className='auth-bar-input'>
        <label className='auth-bar-input__label' for={{props.id}}>{{props.text}}</label>
        <input className='auth-bar-input__input' type={{props.type}} id={{props.id}} value={{props.value}}></input>
      </div>`
    )
  }
}
