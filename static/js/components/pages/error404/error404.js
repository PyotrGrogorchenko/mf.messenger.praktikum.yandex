//#Import
import ErrorBar from '../../../components/error-bar/error-bar.js'
//#Import
import Component from '../../../component/component.js';
export default class Error404 extends Component {
    //#Components
components() {return {ErrorBar}}
//#Components
template() {
        return (`<ErrorBar 
        errCode='404'
        message='Wrong way'
        href='#{R}selectChat'
      ></>`);
    }
}
//# sourceMappingURL=error404.js.map