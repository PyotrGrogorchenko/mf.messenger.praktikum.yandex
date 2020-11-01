import Component from '../component/component.js'
import PageColumn from '../components/page-column.js'

class ErrorBar extends Component {

  components() {return {PageColumn}}

  template() { 
    return (
      `<PageColumn>
        <div class="error-bar">
          <h1>{{props.errCode}}</h1>
          <div>{{props.message}}</div>
          <a class="button-secondary" id="button_back-to-chats" rel="stylesheet" href="selectChat.html">Back to chats</a>
        </div>
      </PageColumn>`
      
    )
  }

}

export default ErrorBar