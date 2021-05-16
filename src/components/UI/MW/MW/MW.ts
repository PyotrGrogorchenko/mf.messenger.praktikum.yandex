import Component from '../../../../component/Component'

class MW extends Component {
  onClose = ((e:MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // document.getElementsByTagName('html')[0].classList.remove('ov-fl_hide')

    const props = this.getProps()
    if (!props.callback) {
      console.error('ModalWindow: callback function is undefined!')
      return
    }
    props.callback()
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
      `<div id='MW' className='MW' onClick={{state.onClick}}>
        <div className='MW-dialog'>
          <div className='MW-content'>
            <div className='MW-header'>
              <h4 className='MW-title'>{{props.title}}</h4>
              <p className='MW_btn-close' onClick={{state.onClose}}>×</p>
            </div>
            <div className='MW-body'>    
           
            </div>
          </div>
        </div>
      </div>`
    )
  }
}

export default MW
