import Component from '../../../../../component/Component'

class Message__Outgoing extends Component {

  template() { 
    return (
      `<div className='message__free-space'>
      </div>
      <div className='message__outgoing'>
        <div className='message__decor bg-gy5'>
          {{props.text}}  
          <span className='message__info'>
            //<i className='color-gray2 fas fa-check-double'></i>
            <p>{{props.date}}</p>
          </span>
        </div>
      </div>`
    )
  }

}

export default Message__Outgoing