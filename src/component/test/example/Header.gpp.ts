import { Component } from '../../index'

export class Header extends Component {
  template() {
    return (
      `<h3 
        className='bar__header'
      >{{props.text}}</h3>`
    )
  }
}
