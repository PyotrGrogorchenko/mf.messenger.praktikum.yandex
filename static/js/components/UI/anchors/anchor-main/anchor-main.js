import Component from '../../../../component/component.js';
class AnchorMain extends Component {
    // constructor(props){
    //   console.log(props)
    // }
    template() {
        return (`<a className='anchor-main' id={{props.id}} rel='stylesheet' href={{props.href}} >{{props.text}}</a>`);
    }
}
export default AnchorMain;
//# sourceMappingURL=anchor-main.js.map