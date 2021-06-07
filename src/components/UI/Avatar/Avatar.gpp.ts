import { Component } from 'gpp-templator'
import { getAvatarSrc, getClasses } from './utils'

export class Avatar extends Component {
  state = {
    сlasses: getClasses(this.getProps()),
    src: getAvatarSrc(this.getProps())
  }

  template() {
    return (
      `<div className={{state.сlasses.avatarEmpty}}>
        <i className={{state.сlasses.icon}}></i>  
      </div>
      <div className={{state.сlasses.avatar}}>
        <img src={{state.src}}></img>
      </div>`
    )
  }
}
