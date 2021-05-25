import { Component } from '@Component'

export class AnchorMain extends Component {
  template() {
    return (
      `<a 
        className='anchor-main'
        id={{props.id}}
        rel='stylesheet'
        href={{props.href}}
      >
        {{props.text}}
      </a>`
    )
  }
}
