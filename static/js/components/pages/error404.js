import Component from '../../component/component.js';
import ErrorBar from '../error-bar.js';
class App extends Component {
    components() { return { ErrorBar }; }
    template() {
        return (`<ErrorBar errCode='404' message='Wrong way'></>`);
    }
}
const root = document.querySelector(".app");
const app = new App();
app.render(root);
//# sourceMappingURL=error404.js.map