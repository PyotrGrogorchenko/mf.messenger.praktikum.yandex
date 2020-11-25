import Component from '../../component/component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import ErrorBar from '../error-bar.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
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