import Component from '../../../../component/component.js'
import Message__FreeSpace from './message__free-space.js'

class Message__Outgoing extends Component {

  components() {return {Message__FreeSpace}}

  template() { 
    return (
      `<div class="message__free-space">
      </div>
      <div class="message__outgoing">
        <div class="message__decor background-gray5">
          Стоя по пояс 
          <span class="message__info">
            <i class="color-gray2 fas fa-check-double"></i>
            22:14
          </span>
        </div>
      </div>`
    )
  }

}

export default Message__Outgoing