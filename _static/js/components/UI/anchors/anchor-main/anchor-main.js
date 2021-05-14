import Component from '../../../../component/Component.js';
class AnchorMain extends Component {
    template() {
        return (`<a className='anchor-main' id={{props.id}} rel='stylesheet' href={{props.href}} >{{props.text}}</a>`);
    }
}
export default AnchorMain;
//# sourceMappingURL=anchor-main.js.map