import Component from '../../../../component/Component'

class AnchorToGo extends Component {
  template() {
    return (
      `<a className='anchor-to-go' id='button-to-profile' rel='stylesheet' href={{props.href}}>
        <p className='anchor-to-go_p'>{{props.text}}</p>
        <i className='anchor-to-go_icon fas fa-caret-right'></i>
      </a>`
    )
  }
}

export default AnchorToGo
