import Component from '../component/component'
import PageColumn from './page-column'

class ErrorBar extends Component {

  components() {return {PageColumn}}

  template() { 
    return (
      `<PageColumn>
        <div class="error-bar">
          <h1>{{props.errCode}}</h1>
          <div>{{props.message}}</div>
          <a 
            className="button-secondary"
            id="button_back-to-chats"
            rel="stylesheet"
            href={{props.href}}
          >
            Back to chats
          </a>
        </div>
      </PageColumn>`
      
    )
  }

}

export default ErrorBar