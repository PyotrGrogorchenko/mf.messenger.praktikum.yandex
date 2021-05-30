import { Component } from '@Component'
import { redirect } from '@router'

const profileOnClick = (e:Event) => {
  e.preventDefault()
  redirect('#profile')
}

export class ChatsBar extends Component {
  list_callback = (data: LooseObject) => {
    this.getProps().callback(data)
  }
  state = {
    profileOnClick,
    list_callback: this.list_callback
  }

  template() {
    return (
      `<div className='chats-bar'>
        <form id='form__header' className='chats-bar__header'>
          <Button text='Profile' id='button_to-profile' onClick={{state.profileOnClick}} style={{secondary}}></>
        </form>
        <ChatsList callback={{state.list_callback}}></>
      </div>`
    )
  }
}
