import { Component } from '@Component'

export class ErrorBar extends Component {
  template() {
    return (
      `<PageColumn>
        <div class='error-bar'>
          <h1>{{props.errCode}}</h1>
          <div>{{props.message}}</div>
          <AnchorMain 
            text='Back to chats'  
            id='button_back-to-chats'
            href={{props.href}}
          </AnchorMain>
        </div>
      </PageColumn>`

    )
  }
}
