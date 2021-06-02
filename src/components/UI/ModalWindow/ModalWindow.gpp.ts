import { Component } from '@Component'

export class ModalWindow extends Component {
  onClose = ((e:MouseEvent) => {
    e.preventDefault()
    const props = this.getProps()
    if (props.cb) props.cb()
  })

  onClick = ((e:MouseEvent) => {
    e.preventDefault()
    e.stopImmediatePropagation()
  })

  state = {
    onClose: this.onClose,
    onClick: this.onClick
  }

  template() {
    return (
      `<div id='mw' className='mw' onClick={{state.onClick}}>
        <div className='mw-dialog'>
          <div className='mw-content'>
            <div className='mw-header'>
              <h4 className='mw-title'>{{props.title}}</h4>
              <p className='mw_btn-close' onClick={{state.onClose}}>×</p>
            </div>
            <div className='mw-body'>    
            </div>
          </div>
        </div>
      </div>`
    )
  }
}
