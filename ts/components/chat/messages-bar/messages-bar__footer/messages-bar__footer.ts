import Component from '../../../../component/Component'

class MessagesBar__Footer extends Component {

  template() { 
    return (
      `<form id='form__footer' className='messages-bar__footer'>
        <button className='button-round bg-w' onClick={{props.func}}>
          <i className='c-gy3 fas fa-paperclip'></i>
        </button>
        <div className='input-gray5'>
          <input className='input-gray5__input' type='text' id='input_send-message' placeholder='Write...'>
        </div>
        <button className='button-round bg-b1 margin5px' onClick={{props.func}}>
          <i className='c-w fas fa-long-arrow-alt-right'></i>
        </button>
      </form>`
    )
  }

}

export default MessagesBar__Footer