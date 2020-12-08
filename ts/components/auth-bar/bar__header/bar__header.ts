import Component from '../../../component/component'

class Bar__Header extends Component {

  template() { 
    return (
      `<h3 className='bar__header'>{{props.text}}</h3>`
    )
  }

}

export default Bar__Header