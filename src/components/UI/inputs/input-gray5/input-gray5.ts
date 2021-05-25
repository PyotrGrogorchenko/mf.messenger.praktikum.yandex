import { Component } from '@Component'

class InputGray5 extends Component {
  state = {
    placeholder: this.getProps().placeholder ? this.getProps().placeholder : '',
    type: this.getProps().type ? this.getProps().type : 'text',
    id: this.getProps().id ? this.getProps().id : 'input_search',
    title: this.getProps().title ? this.getProps().title : '#title#',
    onChange: this.getProps().onChange ? this.getProps().onChange : null
  }

  template() {
    return (
      `<div className='input-gray5'>
        
        {% if({{state.title}} !== '#title#') { %}
          <label className='input-gray5__label' for={{state.id}}>{{state.title}}</label>
        {% } %}  

        //<div className='input-gray5__input-div>
          <input 
            className='input-gray5__input' 
            type={{state.type}}
            id={{state.id}} 
            placeholder={{state.placeholder}}
            onChange={{state.onChange}}
          >
        //</div>     
      </div>`
    )
  }
}

export default InputGray5
