import Component from '../../../component/Component'

class ModalWindow extends Component {

  template() { 
    return (
      `<div className='input-gray5'>
        <input className='input-gray5__input' type='search' id='input_search' placeholder=' Search'>
      </div>`
    )
  }

}

export default ModalWindow