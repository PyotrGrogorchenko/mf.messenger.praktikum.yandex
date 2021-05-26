import { Component } from '@Component'

export class AuthHeader extends Component {
  template() {
    return (
      `<h3 
        className='bar__header'
      >{{props.text}}</h3>`
    )
  }
}
