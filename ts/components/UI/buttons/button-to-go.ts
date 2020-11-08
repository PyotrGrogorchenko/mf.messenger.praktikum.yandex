import Component from '../../../component/component.js'

class ButtonToGo extends Component {

  template() { 
    return (
      `<a className="button-to-go" id="button-to-profile" rel="stylesheet" href="login.html">
        Profile
        <i className="button-to-go_icon fas fa-caret-right"></i>
      </a>`
    )
  }

}

export default ButtonToGo