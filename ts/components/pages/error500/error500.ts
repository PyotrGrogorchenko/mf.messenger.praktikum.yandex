import Component from '../../../component/component'

export default class Error500 extends Component {

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