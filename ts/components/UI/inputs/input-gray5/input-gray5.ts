import Component from '../../../../component/Component'

class InputGray5 extends Component {

  template() { 
    return (
      `<div className='input-gray5'>
        <input 
          className='input-gray5__input' 
          type='search' 
          id='input_search' 
          placeholder=' Search'
          onChange={{props.onChange}}
        >
      </div>`
    )
  }

}

export default InputGray5