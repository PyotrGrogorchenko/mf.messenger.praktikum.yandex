import { Component } from '@Component'
import { formatDate } from '@utils'
import { Props } from './types'
import { getClasses, show } from './utils'

export class Message extends Component {
  state = {
    сlasses: getClasses(this.getProps()),
    date: formatDate(this.getProps<Props>().message.time),
    show: show(this.getProps())
  }

  template() {
    return (
      `{% if ({{state.show}}) { %}
        <div className={{state.сlasses.root}}>
          <a className={{state.сlasses.date}}>
            {{state.date}}
          </a>  
          <div className={{state.сlasses.content}}>
            {{props.message.content}} 
          </div>
        </div>
        {% } %} `
    )
  }
}
