import Component from '../../../component/component'

class BarHeader extends Component {

  template() { 
    return (
      `<h3 className="bar__header">{{props.text}}</h3>`
    )
  }

}

export default BarHeader