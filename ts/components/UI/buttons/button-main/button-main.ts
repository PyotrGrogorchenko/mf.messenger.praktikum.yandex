import Component from '../../../../component/Component'

class ButtonMain extends Component {

  template() { 
    return (
      `<button 
        type='submit'
        className='button-main'
        id={{props.id}}
        onClick={{props.onClick}}
        href={{props.href}}
      >
        {{props.text}}
      </button>`
    )
  }

}

export default ButtonMain