import { Component } from '@Component'
import { Props } from './types'

export class UserSearchItem extends Component {
  onClick = (e: MouseEvent) => {
    e.preventDefault()
    if (this.getProps<Props>().cb) this.getProps<Props>().cb(this.state.id)
  }

  state = {
    onClick: this.onClick,
    id: this.getProps<Props>().id
  }

  template() {
    return (
      `<li 
        className='search-user-item' 
        id={{props.id}} 
        key={{props.key}} 
        onClick={{state.onClick}}
      >
        <div className='search-user-item_avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>
        </div>
        <div className='search-user-item_content'>
          <p>{{props.login}}</p>
        </div>
      </li>`
    )
  }
}
