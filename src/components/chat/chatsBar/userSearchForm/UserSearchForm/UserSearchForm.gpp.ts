import { Component } from '@Component'
import { addUsers, searchUsers } from './utils'
import { Props } from './types'

export class UserSearchForm extends Component {
  onClose = (e: Event | null = null) => {
    if (e) e.preventDefault()
    if (this.getProps<Props>().cb) this.getProps<Props>().cb()
  }
  onClick = (e: Event) => {
    e.preventDefault()
    const input = <HTMLInputElement>document.getElementById('user-search__input')
    const { value } = input
    if (!value) return
    searchUsers(value)
      .then((res) => this.setState({ users: res.response }))
  }
  userItemCb = (id: number) => {
    addUsers(id)
    this.onClose()
  }

  state = {
    users: [],
    onClose: this.onClose,
    onClick: this.onClick,
    userItemCb: this.userItemCb
  }

  template() {
    return (
      `<ModalWindow title='User search' cb={{state.onClose}}>
        <Input id='user-search__input' style='secondary'></>
        <Button 
          id='user-search__button' 
          text='Search'
          onClick={{state.onClick}} 
          style='link'
          icon='search'
          margin='middle'
        ></>
        <div className='user-search__users-list margin-middle'>
          <ul className='users-list__list'>
            {% for (let i = 0; i < state.users.length; i++) { const user = state.users[i]; %}
              <UserSearchItem 
                id={{user.id}} 
                key={{user.id}}
                avatar={{user.avatar}} 
                login={{user.login}}
                cb={{state.userItemCb}}
              ></UserSearchItem>
            {% } %}
          </ul>
        </div> 
      </ModalWindow>`
    )
  }
}
