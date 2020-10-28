import Block from "../../component/block.js"

class ButtonSecondary extends Block {

  // constructor(props){
  //   console.log(props)
  // }

  template() { 
    return (
      `<a class="button-secondary" id={{props.id}} rel="stylesheet" href="signup.html">Sign up</a>`
    )
  }

}

export default ButtonSecondary