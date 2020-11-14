import Component from '../../../component/component.js';
class ButtonMain extends Component {
    template() {
        return (`<button type="submit" className="button-main" id={{props.id}} onClick={{props.onClick}} route={{props.route}}>{{props.text}}</button>`);
    }
}
export default ButtonMain;
//# sourceMappingURL=button-main.js.map