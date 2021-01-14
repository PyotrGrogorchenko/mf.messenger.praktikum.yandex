import Component from '../../../../component/Component'
import { env } from '../../../../const/index'
import { HTTPTransport } from '../../../../xhr/HTTPTransport'

class ChatsList__SearchWindow extends Component {

  async getChats(searchString: string = '') {
    
    if (searchString === '') { return }
    
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.post(`${env.URL_REQUEST}/user/search`, 
      {
        withCredentials: true,
        headers: {'content-type': 'application/json'},
        data: {login: searchString}
      }) as XMLHttpRequest
    
      console.log(req.response)

      this.setState({chats:req.response})

  }

  search_onChange = async (e:Event) => {
    this.setState(this.getChats((e.target as HTMLInputElement).value))
    await this.getChats()
  }


  onClose = () => {
    this.state.chats = []
    this.getProps().callback()
  }

  item_callback = (id: string) => {
    
    let chat = null
    for(let i = 0; i < this.state.chats.length; i++) {
      if (String((this.state.chats[i] as any).id) === id) {
        chat = this.state.chats[i]
        break
      }
    }    
    
    this.state.chats = []
    this.getProps().callback(chat)
  }


  state = {
    onClose: this.onClose,
    item_callback: this.item_callback,
    chats: [],
    search_onChange: this.search_onChange
  }

  template() { 
    return (
      `{% if({{props.show}}) { %}
        <ModalWindow title='Search users' callback={{state.onClose}}>
          <div className='search-window__selections'>
            <InputGray5 onChange={{state.search_onChange}}></InputGray5>
          </div> 
          
          <div className='search-window__list'>
            <ul className='chats-list__list'>
            
              {% for (let i = 0; i < state.chats.length; i++) { const chat = state.chats[i]; %}
                <SearchWindow__SearchItem 
                  id={{chat.id}} 
                  key={{chat.id}}
                  avatar={{chat.avatar}} 
                  login={{chat.login}}
                  callback={{state.item_callback}}
                ></SearchWindow__SearchItem>
              {% } %}
            
            </ul>
          </div> 
        </ModalWindow>
      {% } %}`
    )
  }

}

export default ChatsList__SearchWindow