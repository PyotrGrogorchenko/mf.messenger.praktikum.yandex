//#Import
import AnchorMain from '../../components/UI/anchors/anchor-main/anchor-main.js'
import PageColumn from '../../components/page-column/page-column.js'
//#Import
import Component from '../../component/component.js';
class ErrorBar extends Component {
    //#Components
components() {return {PageColumn,AnchorMain}}
//#Components
template() {
        return (`<PageColumn>
        <div class='error-bar'>
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