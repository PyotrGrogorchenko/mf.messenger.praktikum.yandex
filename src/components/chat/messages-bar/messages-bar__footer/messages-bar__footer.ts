import Component from '../../../../component/Component'

class MessagesBar__Footer extends Component {
  template() {
    return (
      `<form id='form__footer' className='messages-bar__footer'>
        
        <div className='footer__left'>
          <button className='button-round bg-w' >
            <i className='c-gy3 fas fa-paperclip'></i>
          </button>
        </div>       
        
        <div className='footer__middle'>
          <InputGray5 type='text' id='input_send-message' placeholder='Write...'></InputGray5>
        </div>
  
        <div className='footer__right'>
          <button className='button-round bg-b1 margin5px' onClick={{props.sendMessage_onClik}}>
            <i className='c-w fas fa-long-arrow-alt-right'></i>
          </button>
        </div>
      
      </form>`
    )
  }
}

export default MessagesBar__Footer
