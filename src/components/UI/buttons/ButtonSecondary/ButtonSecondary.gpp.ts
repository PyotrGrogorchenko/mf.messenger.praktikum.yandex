import { Component } from '@Component'

export class ButtonSecondary extends Component {
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
