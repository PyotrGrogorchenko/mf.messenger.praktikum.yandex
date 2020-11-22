import Component from '../../../component/component'

class AnchorMain extends Component {

  // constructor(props){
  //   console.log(props)
  // }

  template() { 
    return (
      `<a className="anchor-main" id={{props.id}} rel="stylesheet" href={{props.href}} >{{props.text}}</a>`
    )
  }

}

export default AnchorMain