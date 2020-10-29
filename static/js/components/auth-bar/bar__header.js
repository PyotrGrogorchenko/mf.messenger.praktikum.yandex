import Block from "../../component/block.js"

class BarHeader extends Block {

  template() { 
    return (
      `<h3 class="bar__header">{{props.text}}</h3>`
    )
  }

}

export default BarHeader