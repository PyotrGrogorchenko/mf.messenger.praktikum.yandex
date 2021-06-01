import { Component } from '@Component'

export class MessagesBarFooter extends Component {
  template() {
    return (
      `<form id='form__footer' className='messages-bar__footer'>
        
        <div className='footer__left'>
          <button className='button-round bg-w' >
            <i className='c-middle fas fa-paperclip'></i>
          </button>
        </div>       
        
        <div className='footer__middle'>
          // <InputGray5 type='text' id='input_send-message' placeholder='Write...'></InputGray5>
        </div>
  
        <div className='footer__right'>
          <button className='button-round bg-b1 margin-small' onClick={{props.sendMessage_onClik}}>
            <i className='c-middle fas fa-long-arrow-alt-right'></i>
          </button>
        </div>
      
      </form>`
    )
  }
}
