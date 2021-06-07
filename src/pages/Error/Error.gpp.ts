import { Component } from 'gpp-templator'
import { goBack } from '@router'
import { getData } from './utils'

export class Error extends Component {
  backOnClick = (e:Event) => {
    e.preventDefault()
    goBack()
  }

  state = {
    data: getData(),
    backOnClick: this.backOnClick
  }

  template() {
    return (
      `<div className='flex-column'>
        <div className='error-bar'>
          <h1>{{state.data.status}}</h1>
          <h4>{{state.data.reason}}</h4>
          <Button 
            text='Back'
            id='button_back'
            onClick={{state.backOnClick}}
            style='secondary'
            margin='middle'></>
          </div>
      </div>`
    )
  }
}
