import { Component } from '../../index'

export class Input extends Component {
  template() {
    return (
      `<div className='input'>
        <label 
          className='input__label'
          for={{props.id}}
        >{{props.text}}</label>
        <input
          className='input__input'
          type={{props.type}}
          id={{props.id}}
          value={{props.value}}
        ></input>
      </div>`
    )
  }
}
