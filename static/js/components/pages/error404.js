import Component from '../../component/component.js';
import ErrorBar from '../error-bar.js';
import PageId from '../pageId.js';
export default class Error404 extends Component {
    components() { return { ErrorBar, PageId }; }
    template() {
        return (`<PageId pageId='error404'></PageId>
      <ErrorBar 
        errCode='404'
        message='Wrong way'
        href='#{R}selectChat'
      ></>`);
    }
}
//# sourceMappingURL=error404.js.map