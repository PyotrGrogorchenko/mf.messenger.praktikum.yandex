import Component from '../../component/component.js';
import ErrorBar from '../error-bar.js';
export default class Error404 extends Component {
    components() { return { ErrorBar }; }
    template() {
        return (`<ErrorBar 
        errCode='404'
        message='Wrong way'
        href='#{R}selectChat'
      ></>`);
    }
}
//# sourceMappingURL=error404.js.map