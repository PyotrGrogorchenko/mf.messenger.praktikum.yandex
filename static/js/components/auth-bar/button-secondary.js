import Component from "../../component/component.js"

class ButtonSecondary extends Component {

  // constructor(props){
  //   console.log(props)
  // }

  template() { 
    return (
      `<a class="button-secondary" id={{props.id}} rel="stylesheet" href="signup.html">{{props.text}}</a>`
    )
  }

}

export default ButtonSecondary