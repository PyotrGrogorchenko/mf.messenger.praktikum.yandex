import Component from '../../../../component/component'

class AnchorToGo extends Component {

  template() { 
    return (
      `<a className='anchor-to-go' id='button-to-profile' rel='stylesheet href='#{R}userSettings'>
        Profile
        <i className='anchor-to-go_icon fas fa-caret-right'></i>
      </a>`
    )
  }

}

export default AnchorToGo