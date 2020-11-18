import Component from '../../component/component'
import ErrorBar from '../error-bar'
import PageId from '../pageId'

export default class Error500 extends Component {

  components() {return {ErrorBar, PageId}}
  
  template() { 

    return  (
      `<PageId pageId='error500'></PageId>
      <ErrorBar
        errCode='500'
        message='Sorry, something is wrong'
        href='#{R}selectChat'
      ></>`
    )
  }

}