import { Component } from '@Component'

export class InputField extends Component {
  template() {
    return (
      `<Input 
        label={{props.field.label}}
        type={{props.field.type}}
        id={{props.field.name}}
        value={{props.field.value}}
        valid={{props.field.valid}}
        onBlur={{props.onBlur}}
      ></>`
    )
  }
}
