import Block from "../../component/block.js"

class ButtonMain extends Block {

  template() { 
    return (
      `<button type="submit" class="button-main" id={{props.id}}>{{props.text}}</button>`
    )
  }

}

export default ButtonMain