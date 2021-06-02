import { Component } from '@Component'

export class ModalWindowSearchUser extends Component {
  search_onChange = async (e:Event) => {
    e.preventDefault()
    e.stopPropagation()
    await this.getUsers((e.target as HTMLInputElement).value)
  }

  search_onClick = (e:Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  onClose = () => {
    if (this.getProps().cb) this.getProps().cb()
  }

  item_callback = (id: string) => {
    let chat = null
    for (let i = 0; i < this.state.users.length; i++) {
      if (String((this.state.users[i] as any).id) === id) {
        chat = this.state.users[i]
        break
      }
    }

    this.state.users = []
    this.getProps().callback(chat)
  }

  state = {
    users: [],
    onClose: this.onClose,
    item_callback: this.item_callback,
    search_onChange: this.search_onChange
  }

  template() {
    return (
      `<ModalWindow title='Search users' cb={{state.onClose}}>
          <Input id='user-search-input' title='Title' style='secondary'></Input>

          // <div className='MW__list'>
          //   <ul className='users-list__list'>
            
          //     {% for (let i = 0; i < state.users.length; i++) { const chat = state.users[i]; %}
          //       <SearchUser__Item 
          //         id={{chat.id}} 
          //         key={{chat.id}}
          //         avatar={{chat.avatar}} 
          //         login={{chat.login}}
          //         callback={{state.item_callback}}
          //       ></SearchUser__Item>
          //     {% } %}
            
          //   </ul>
          // </div> 
        </ModalWindow> `
    )
  }
}
