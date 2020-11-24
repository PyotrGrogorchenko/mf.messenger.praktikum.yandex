import Component from '../component/component.js.js.js.js.js';
import PageColumn from './page-column.js.js.js.js.js';
import AnchorMain from './UI/anchors/anchor-main.js.js.js.js.js';
class ErrorBar extends Component {
    components() { return { PageColumn, AnchorMain }; }
    template() {
        return (`<PageColumn>
        <div class="error-bar">
          <h1>{{props.errCode}}</h1>
          <div>{{props.message}}</div>
          <AnchorMain 
            text='Back to chats'  
            id='button_back-to-chats'
            href={{props.href}}
          </AnchorMain>
        </div>
      </PageColumn>`);
    }
}
export default ErrorBar;
//# sourceMappingURL=error-bar.js.map