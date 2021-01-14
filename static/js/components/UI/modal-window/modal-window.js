import Component from '../../../component/Component.js';
class ModalWindow extends Component {
    constructor() {
        super(...arguments);
        this.onClose = ((e) => {
            e.preventDefault();
            e.stopPropagation();
            //document.getElementsByTagName('html')[0].classList.remove('ov-fl_hide')
            const props = this.getProps();
            if (!props.callback) {
                console.error('ModalWindow: callback function is undefined!');
                return;
            }
            props.callback();
        });
        this.state = {
            onClose: this.onClose,
        };
    }
    template() {
        return (`<div id='mw' className='mw'>
        <div className='mw-dialog'>
          <div className='mw-content'>
            <div className='mw-header'>
              <p className='mw-title'>{{props.title}}</p>
              <p className='mw_btn-close' onClick={{state.onClose}}>×</p>
            </div>
            <div className='mw-body'>    
           
            </div>
          </div>
        </div>
      </div>`);
    }
}
export default ModalWindow;
//# sourceMappingURL=modal-window.js.map