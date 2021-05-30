import { Component } from '@Component'
// import { WS } from '../../../../webSocket/WebSoket'

export class MessagesBar extends Component {
  chatid: number = 0
  token: string = ''
  // ws: WS | null = null
  avatar: string = ''
  title: string = ''
  userid: string = ''

  messages: Array<LooseObject> = []

  componentDidMount(props:any) {
    this.updatePage(props)
    setInterval(() => this.updatePage(this.getProps()), 5000)
  }

  componentDidUpdate(oldProps: any, props: any) {
    if (props.chatid === this.chatid) {
      return
    }

    this.updatePage(props)
  }

  updatePage(props:any) {
    // this.chatid = props.chatid
    // this.avatar = props.avatar
    // this.title = props.title
    // this.token = props.token
    // this.userid = localStorage.getItem('id') as string

    // this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token)
    // this.ws.onMessage = this.wsOnMessagesGetOld
    // this.ws.onOpen = () => {this.ws?.send('0', 'get old')}
  }

  wsOnMessagesGetOld = (event: MessageEvent) => {
    // const messages = JSON.parse(event.data)
    // this.messages = []

    // for (let i = 0; i < messages.length; i++) {
    //   const message = messages[i]
    //   const id = message.id ? message.id : ''
    //   const type = String(message.user_id) === this.userid ? 'out' : 'in'
    //   this.messages.unshift({
    //     id: messages.length - i, type, date: this.formatDate(message.time), text: message.content
    //   })
    // }
    // this.setState({ messages: this.messages })
  }

  sendMessage_onClik = (e:MouseEvent) => {
    e.preventDefault()
    e.stopImmediatePropagation()

    // const input = document.getElementById('input_send-message') as HTMLInputElement
    // const value = input.value.trim()
    // input.value = ''

    // if (!value) {
    //   return
    // }

    // this.ws = new WS(String(localStorage.getItem('id')), String(this.chatid), this.token)
    // this.ws.onMessage = this.wsOnMessagesSendMessages
    // this.ws.onOpen = () => {
    //   this.ws?.send(value)
    // }
  }

  wsOnMessagesSendMessages = (event: Event) => {
    this.updatePage(this.getProps())
  }

  formatDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }

    return new Date(date).toLocaleString('ru', options)
  }

  state = {
    sendMessage_onClik: this.sendMessage_onClik,
    messages: this.messages
  }

  template() {
    return (
      `<div className='messages-bar'>
        <MessagesBarHeader title={{props.title}} id={{props.chatid}} avatar={{props.avatar}}></>
        <MessagesBarMessages messages={{state.messages}}></> 
        <MessagesBarFooter sendMessage_onClik={{state.sendMessage_onClik}}></>
      </div>`
    )
  }
}
