import { Component } from '@Component'
import { getClasses, getIcon } from './utils'

export class Button extends Component {
  // componentDidMount(props: any) {
  //   console.log(getIcon(props))
  // }
  state = {
    сlasses: getClasses(this.getProps()),
    icon: getIcon(this.getProps())
  }

  template() {
    return (
      `<button 
        type='submit'
        className={{state.сlasses.button}}
        id={{props.id}}
        onClick={{props.onClick}}
      >
        {% if ({{state.icon}} !== '') { %}
          <i className={{state.icon}}></i>
        {% } %} 
        {{props.text}}
      </button>`
    )
  }
}
