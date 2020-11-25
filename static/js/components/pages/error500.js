import Component from '../../component/component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import ErrorBar from '../error-bar.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
export default class Error500 extends Component {
    components() { return { ErrorBar }; }
    template() {
        return (`<ErrorBar
        errCode='500'
        message='Sorry, something is wrong'
        href='#{R}selectChat'
      ></>`);
    }
}
//# sourceMappingURL=error500.js.map