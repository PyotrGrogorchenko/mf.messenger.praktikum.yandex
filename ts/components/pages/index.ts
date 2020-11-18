import Component from '../../component/component'
import PagesMenu from '../pagesMenu'
import PageId from '../pageId'

export default class Index extends Component {

  components() {return {PagesMenu, PageId}}
  
  template() { 

    return  (

      `<PageId pageId='index'></PageId>
      <div id="error404"></div>
      <PagesMenu></PagesMenu>`

    ) 
  }
}