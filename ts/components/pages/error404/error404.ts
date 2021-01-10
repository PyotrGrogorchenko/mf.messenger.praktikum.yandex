import Component from '../../../component/Component'

export default class Error404 extends Component {

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