import Component from '../../component/component'
import ErrorBar from '../error-bar'

export default class Error500 extends Component {

  components() {return {ErrorBar}}
  
  template() { 

    return  (
      `<ErrorBar
        errCode='500'
        message='Sorry, something is wrong'
        href='#{R}selectChat'
      ></>`
    )
  }

}