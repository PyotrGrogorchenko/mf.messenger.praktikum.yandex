import { Component } from '@Component'
import { Field, getTip } from '@validation'
import { getClasses } from './utils'

export class Input extends Component {
  componentDidUpdate(props: Field) {
    if (props.valid === this.state.valid) return
    this.setState({
      сlasses: getClasses(props),
      valid: props.valid
    })
  }

  onBlur = (e: FocusEvent) => {
    if (this.getProps().onBlur) {
      this.getProps().onBlur(e)
    }
  }

  state = {
    сlasses: getClasses(this.getProps()),
    onBlur: this.onBlur,
    valid: this.getProps().valid,
    tip: getTip(this.getProps().type),
    value: this.getProps().value || ''
  }

  template() {
    return (
      `<div className='input'>
        <label 
          className={{state.сlasses.label}}
          for={{props.id}}
        >{{props.label}}</label>
        <input 
          className={{state.сlasses.input}}
          type={{props.type}}
          id={{props.id}}
          value={{state.value}}
          onBlur={{state.onBlur}}
        ></input>
        <label
          className={{state.сlasses.tip}}
        >
          {{state.tip}}
        </label>
      </div>`
    )
  }
}
