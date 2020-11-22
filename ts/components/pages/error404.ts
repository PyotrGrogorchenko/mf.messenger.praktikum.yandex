import Component from '../../component/component'
import ErrorBar from '../error-bar'

export default class Error404 extends Component {

  components() {return {ErrorBar}}
  
  template() { 

    return  (
      `<ErrorBar 
        errCode='404'
        message='Wrong way'
        href='#{R}selectChat'
      ></>`
    )
  }

}