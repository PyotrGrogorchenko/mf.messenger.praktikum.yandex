import Component from '../../../../component/Component.js';
class ButtonMain extends Component {
    template() {
        return (`<button 
        type='submit'
        className='button-main'
        id={{props.id}}
        onClick={{props.onClick}}
        href={{props.href}}
      >
        {{props.text}}
      </button>`);
    }
}
export default ButtonMain;
//# sourceMappingURL=button-main.js.map