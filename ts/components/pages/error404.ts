import Component from '../../component/component'
import ErrorBar from '../error-bar'
import PageId from '../pageId'

export default class Error404 extends Component {

  components() {return {ErrorBar, PageId}}
  
  template() { 

    return  (
      `<PageId pageId='error404'></PageId>
      <ErrorBar 
        errCode='404'
        message='Wrong way'
        href='#{R}selectChat'
      ></>`
    )
  }

}