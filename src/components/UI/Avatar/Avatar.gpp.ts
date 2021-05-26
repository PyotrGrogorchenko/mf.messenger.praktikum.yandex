import { Component } from '@Component'
// import { env } from '../../../const/index'

export class Avatar extends Component {
  template() {
    return (
      `{% if({{props.avatar}} === null ) { %}
          <div className='avatar-empty'>
            <i className='c-gy3 fas fa-camera'></i>  
          </div>
        {% } else { %}
          <div className='avatar'>
            <img src={{props.avatar}}></img>
          </div>
      {% } %}`
    )
  }
}
