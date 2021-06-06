import { Component } from '@Component'
import { getTip, FieldTypes } from '@validation'
import { getClasses } from './utils'
import { Props } from './types'

export class Input extends Component {
  componentDidUpdate(props: Props) {
    if (props.valid === this.state.valid) return
    this.setState({
      сlasses: getClasses(props),
      valid: props.valid
    })
  }

  onBlur = (e: FocusEvent) => {
    if (this.getProps<Props>().onBlur) this.getProps<Props>().onBlur(e)
  }

  state = {
    сlasses: getClasses(this.getProps()),
    onBlur: this.onBlur,
    valid: this.getProps<Props>().valid,
    tip: getTip(this.getProps<Props>().type as FieldTypes)
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
          value={{props.value}}
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
