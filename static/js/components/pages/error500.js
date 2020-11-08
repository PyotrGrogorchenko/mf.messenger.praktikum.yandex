import Component from '../../component/component.js';
import ErrorBar from '../error-bar.js';
class App extends Component {
    components() { return { ErrorBar }; }
    template() {
        return (`<ErrorBar errCode='500' message='Sorry, something is wrong'></>`);
    }
}
const root = document.querySelector(".app");
const app = new App();
app.render(root);
//# sourceMappingURL=error500.js.map