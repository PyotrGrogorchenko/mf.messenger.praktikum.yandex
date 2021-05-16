import Component from '../../../../component/Component'

class ButtonIcon extends Component {
  template() {
    return (
      `<button className='button-round bg-b1 margin5px' onClick={{props.func}}>
        <i className='c-w fas fa-long-arrow-alt-right'></i>
      </button>`
    )
  }
}

export default ButtonIcon
