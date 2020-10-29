import Component from "../../component/component.js"

class ButtonMain extends Component {

  template() { 
    return (
      `<button type="submit" class="button-main" id={{props.id}}>{{props.text}}</button>`
    )
  }

}

export default ButtonMain