import Component from '../../../../../component/Component'

class Message__Incoming extends Component {

  template() { 
    return (
      `<div className='message__incoming'>
        <div className='message__decor bg-gy4'>
          {{props.text}} 
        <span className='message__info'>
          <i className='hide color-gray2 fas fa-check-double'></i>
          <p>{{props.date}}</p>
        </span>
        </div>
          
        <Message__FreeSpace></Message__FreeSpace>
        
      </div>`
    )
  }

}

export default Message__Incoming