import Component from '../component/component.js';
import PagesMenu from '../components/pages/pagesMenu.js';
export default class Index extends Component {
    components() { return { PagesMenu }; }
    template() {
        return (`<PagesMenu></PagesMenu>`);
    }
}
//# sourceMappingURL=index.js.map