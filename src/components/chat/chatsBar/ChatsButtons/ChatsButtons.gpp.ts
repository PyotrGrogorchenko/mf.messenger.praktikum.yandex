import { Component } from '@Component'

const chatAddOnClick = (e:MouseEvent) => {
  e.preventDefault()
  // e.path.forEach((item) => console.log(item))
  console.log(e)
}

export class ChatsButtons extends Component {
  state = {
    chatAddOnClick
  }

  template() {
    return (
      `<div id='chats-bar__buttons'>
          <Button
            text='Add chat'
            id='button_chatAdd'
            onClick={{state.chatAddOnClick}}
            align='start'
            style='link'
            icon='chatAdd'
            margin='middle'
          ></>
          <Button
            text='Remove chat'
            id='button_chatRemove'
            onClick={{state.onClick}}
            align='start'
            style='link'
            icon='chatRemove'
            margin='small'
          ></>
          <Button
            text='Add user'
            id='button_userAdd'
            onClick={{state.onClick}}
            align='start'
            style='link'
            icon='userAdd'
            margin='small'
          ></>
          <Button
            text='Remove user'
            id='button_userRemove'
            onClick={{state.onClick}}
            align='start'
            style='link'
            icon='userRemove'
            margin='small'
          ></>        
        </div>
        
        // <ModalWindowAddChat showAddChat={{state.showAddChat}} callback={{state.addChat_callback}}></>

        
        `
    )
  }
}
