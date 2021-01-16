//#Import
import ErrorBar from '../../../components/error-bar/error-bar.js'
//#Import
import Component from '../../../component/Component.js';
export default class Error500 extends Component {
    //#Components
components() {return {ErrorBar}}
//#Components
template() {
        return (`<ErrorBar
        errCode='500'
        message='Sorry, something is wrong'
        href='#{R}selectChat'
      ></>`);
    }
}
//# sourceMappingURL=error500.js.map