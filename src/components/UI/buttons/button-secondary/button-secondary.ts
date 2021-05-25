import { Component } from '@Component'

class ButtonSecondary extends Component {
  template() {
    return (
      `<button 
        type='submit'
        className='button-secondary'
        id={{props.id}}
        onClick={{props.onClick}}
        href={{props.href}}
      >
        {{props.text}}
      </button>`
    )
  }
}

export default ButtonSecondary
