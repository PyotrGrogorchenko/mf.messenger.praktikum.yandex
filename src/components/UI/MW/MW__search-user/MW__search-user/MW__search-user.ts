import { Component } from '@Component'
import { xhrPostUsersSearh, xhrOnError } from '@xhr'

class MW__SearchUser extends Component {
  async getUsers(searchString: string = '') {
    if (searchString === '') {
      this.state.users = []
      this.setState({ users: [] })
      return
    }

    const req = await xhrPostUsersSearh(searchString)
    if (!req) {return}
    if (req.response.status >= 400) {xhrOnError()}

    this.setState({ users: req.response })
  }

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
    this.state.users = []
    this.getProps().callback()
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
      `{% if({{props.showSearchUsers}}) { %}
        <MW title='Search users' callback={{state.onClose}}>

          <InputGray5 onChange={{state.search_onChange}} id='input_search-users' ></InputGray5>
          
          <div className='MW__list'>
            <ul className='users-list__list'>
            
              {% for (let i = 0; i < state.users.length; i++) { const chat = state.users[i]; %}
                <SearchUser__Item 
                  id={{chat.id}} 
                  key={{chat.id}}
                  avatar={{chat.avatar}} 
                  login={{chat.login}}
                  callback={{state.item_callback}}
                ></SearchUser__Item>
              {% } %}
            
            </ul>
          </div> 
        </MW>
      {% } %}`
    )
  }
}

export default MW__SearchUser
