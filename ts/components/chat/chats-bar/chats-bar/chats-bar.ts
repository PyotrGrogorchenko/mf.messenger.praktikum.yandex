import Component from '../../../../component/Component'

class ChatsBar extends Component {

  template() { 
    return (
      `<div className='chats-bar'>
        <form id='form__header' className='chats-bar__header'>
          <AnchorToGo></AnchorToGo>
          <InputGray5></InputGray5>
        </form>
        <ChatsBar__ChatsList></ChatsBar__ChatsList>
      </div>`
    )
  }

}

export default ChatsBar