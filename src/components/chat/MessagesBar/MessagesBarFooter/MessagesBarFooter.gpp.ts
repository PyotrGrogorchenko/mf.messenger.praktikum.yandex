import { Component } from '@Component'

export class MessagesBarFooter extends Component {
  onClick = (e:MouseEvent) => {
    e.preventDefault()
    console.log('send message')
  }

  state = {
    onClick: this.onClick
  }

  template() {
    return (
      `<div id='form__footer' className='messages-bar__footer'>
        <div className='footer__content'>
          <div className='footer__middle'>
            <Input
              id='send-message_input'
              style='secondary'
              fontSize='big'
            ></Input>
          </div>
          <div className='footer__right'>
            <Button
              id='send-message_button'
              onClick={{state.onClick}}
              icon='paperPlane'
          ></div>
        </div>
      </div>
      
      </div>`
    )
  }
}
