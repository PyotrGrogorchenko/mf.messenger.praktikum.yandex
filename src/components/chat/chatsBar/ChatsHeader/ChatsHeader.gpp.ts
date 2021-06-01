import { Component } from '@Component'
import { redirect } from '@router'

const profileOnClick = (e:Event) => {
  e.preventDefault()
  redirect('#profile')
}

export class ChatsHeader extends Component {
  state = {
    profileOnClick
  }

  template() {
    return (
      `<div id='chats-bar__header' className='chats-bar__header'>
          <Button 
            text='Profile' 
            id='button_to-profile'
            onClick={{state.profileOnClick}}
            icon='angleRight'
            style='link'
            align='end'
          ></>
          <ChatsButtons></>
        </div>`
    )
  }
}
