import { Component } from '@Component'

class ChatsBar extends Component {
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
          <AnchorToGo text='Profile' href='#{R}#userSettings'></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <ChatsBar__ChatsList callback={{state.list_callback}}></ChatsBar__ChatsList>
      </div>`
    )
  }
}

export default ChatsBar
