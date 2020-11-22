import Component from '../../component/component.js';
import PageColumn from '../page-column.js';
export default class Index extends Component {
    components() { return { PageColumn }; }
    state() {
        return {};
    }
    template() {
        return (`<PageColumn>
        <h1>Messanger</h1>
      </PageColumn>`);
    }
}
//# sourceMappingURL=index.js.map