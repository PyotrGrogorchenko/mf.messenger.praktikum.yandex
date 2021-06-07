import { Component } from 'gpp-templator'

export class FormHeader extends Component {
  template() {
    return (
      `<h3 
        className='bar__header'
      >{{props.text}}</h3>`
    )
  }
}
