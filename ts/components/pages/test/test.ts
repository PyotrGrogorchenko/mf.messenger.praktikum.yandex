import Component from '../../component/component'
import PagesMenu from '../pagesMenu'

export default class Test extends Component {

  components() {return {PagesMenu}}
  
  template() { 

    return  (

      `<PagesMenu></PagesMenu>`

    ) 
  }
}