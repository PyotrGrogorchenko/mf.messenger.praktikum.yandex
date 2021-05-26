import { Component } from '@Component'

export class ChatsBar extends Component {
  list_callback = (data: LooseObject) => {
    this.getProps().callback(data)
  }
  state = {
    list_callback: this.list_callback
  }

  template() {
    return (
      `<div className='chats-bar'>
        <form id='form__header' className='chats-bar__header'>
          <AnchorMain text='Profile' href='#{R}#userSettings'></>
          <InputSecondary></InputSecondary>
        </form>
        <ChatsList callback={{state.list_callback}}></>
      </div>`
    )
  }
}
