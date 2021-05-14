import Component from '../../../component/Component.js';
class Avatar extends Component {
    template() {
        return (`{% if({{props.avatar}} === null ) { %}
          <div className='avatar-empty'>
            <i className='c-gy3 fas fa-camera'></i>  
          </div>
        {% } else { %}
          <div className='avatar'>
            <img src={{props.avatar}}></img>
          </div>
      {% } %}`);
    }
}
export default Avatar;
//# sourceMappingURL=avatar.js.map