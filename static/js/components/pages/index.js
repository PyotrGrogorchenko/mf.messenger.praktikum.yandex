import Component from '../../component/component.js';
import PagesMenu from '../pagesMenu.js';
import PageId from '../pageId.js';
export default class Index extends Component {
    components() { return { PagesMenu, PageId }; }
    template() {
        return (`<PageId pageId='index'></PageId>
      <div id="error404"></div>
      <PagesMenu></PagesMenu>`);
    }
}
//# sourceMappingURL=index.js.map