import Component from '../../../component/component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
class ButtonMain extends Component {
    template() {
        return (`<button 
        type="submit"
        className="button-main"
        id={{props.id}}
        onClick={{props.onClick}}
        href={{props.href}}
      >
        {{props.text}}
      </button>`);
    }
}
export default ButtonMain;
//# sourceMappingURL=button-main copy.js.map