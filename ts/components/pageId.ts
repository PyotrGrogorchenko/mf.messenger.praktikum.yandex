import Component from '../component/component'

export default class PageId extends Component {

  template() { 

    return  (
      `<div className="page-id" id="page-id" pageId={{props.pageId}}></div>`
    )
  }

}