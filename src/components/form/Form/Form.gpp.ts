import { Component } from 'gpp-templator'

export class Form extends Component {
  template() {
    return (
      `<form
        formName={{props.formName}}
        id='form__main'
        className='auth-bar-form'>
      </form>`
    )
  }
}
