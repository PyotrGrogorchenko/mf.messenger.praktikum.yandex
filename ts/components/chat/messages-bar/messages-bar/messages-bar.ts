import Component from '../../../../component/Component'
import { WS } from '../../../../webSocket/WebSoket'
import { xhrPostChatsToken } from '../../../../xhr/xhrExecute'

class MessagesBar extends Component {

  chatid: number = 0
  token: string = ''
  ws: WS | null = null
  avatar: string = ''
  title: string = ''
  userid: string = ''

  messages: Array<LooseObject> = []

  componentDidMount(props:any) {

    this.updatePage(props)
    //setInterval(() => {this.updatePage(this.getProps)}, 5000);
  }

  componentDidUpdate(oldProps: any, props: any) {
    if (props.chatid === this.chatid) {
      return
    }
    
    this.updatePage(props)
  }

  updatePage(props:any) {
    
    this.chatid = props.chatid
    this.avatar = props.avatar
    this.title = props.title
    this.token = props.token
    this.userid = localStorage.getItem('id') as string

    this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token)
    this.ws.onMessage = this.wsOnMessagesGetOld
    this.ws.onOpen = () => { this.ws?.send('0', 'get old') }
    
  }


  wsOnMessagesGetOld = (event: MessageEvent) => {
    const messages = JSON.parse(event.data)
    this.messages = []
    for (let i=0; i<messages.length; i++) {
      const message = messages[i]
      const type = String(message.user_id) === this.userid ? 'out' : 'in'
      const id = message.id ? message.id : ''
      this.messages.unshift({ id, type, date: this.formatDate(message.time), text: message.content})      
    }
    this.setState({messages: this.messages})
  }


  sendMessage_onClik = (e:MouseEvent) => {
    e.preventDefault()
    e.stopImmediatePropagation()
   
    const input = document.getElementById('input_send-message') as HTMLInputElement
    const value = input.value.trim()
    input.value = ''
    
    if (!value) {
      return
    }

    this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token)
    this.ws.onMessage = this.wsOnMessagesSendMessages
    this.ws.onOpen = () => { this.ws?.send(value) }


  }

  wsOnMessagesSendMessages = (event: Event) => {
  
    this.updatePage(this.getProps())

  }


  formatDate(date: string) {
    return date
  }

  state = {
    sendMessage_onClik: this.sendMessage_onClik,
    messages: this.messages
  }

  template() { 
    return (
      `<div className='messages-bar'>
        <MessagesBar__Header title={{props.title}} id={{props.chatid}} avatar={{props.avatar}}></MessagesBar__Header>
        <MessagesBar__Messages messages={{state.messages}}></MessagesBar__Messages> 
        <MessagesBar__Footer sendMessage_onClik={{state.sendMessage_onClik}}></MessagesBar__Footer>
      </div>`
    )
  }

}



export default MessagesBar