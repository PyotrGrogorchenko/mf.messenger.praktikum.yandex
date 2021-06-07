import { Component } from 'gpp-templator'
import { getClasses } from './utils'

export class Button extends Component {
  state = {
    сlasses: getClasses(this.getProps())
  }

  template() {
    return (
      `<button 
        // type='submit'
        className={{state.сlasses.button}}
        id={{props.id}}
        onClick={{props.onClick}}
      >
        <div className={{state.сlasses.content}}>
        {% if ({{state.сlasses.iconStart}} !== '') { %}
          <i className={{state.сlasses.iconStart}}></i>
        {% } %}
        <a className={{state.сlasses.anchor}}>
            {{props.text}}
          </a>
          {% if ({{state.сlasses.iconEnd}} !== '') { %}
            <i className={{state.сlasses.iconEnd}}></i>
          {% } %}
          </div>
        </button>`
    )
  }
}
