import Component from '../../component/component.js';
import ErrorBar from '../error-bar.js';
import PageId from '../pageId.js';
export default class Error500 extends Component {
    components() { return { ErrorBar, PageId }; }
    template() {
        return (`<PageId pageId='500'></PageId>
      <ErrorBar
        errCode='500'
        message='Sorry, something is wrong'
        href='#{R}selectChat'
      ></>`);
    }
}
//# sourceMappingURL=error500.js.map