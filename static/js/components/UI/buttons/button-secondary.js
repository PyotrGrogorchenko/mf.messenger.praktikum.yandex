import Component from '../../../component/component.js';
class ButtonSecondary extends Component {
    // constructor(props){
    //   console.log(props)
    // }
    template() {
        return (`<a className="button-secondary" id={{props.id}} rel="stylesheet" href="signup.html">{{props.text}}</a>`);
    }
}
export default ButtonSecondary;
//# sourceMappingURL=button-secondary.js.map