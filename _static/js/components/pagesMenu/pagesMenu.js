//#Import
import PageColumn from '../../components/page-column/page-column.js'
//#Import
import Component from '../../component/Component.js';
export default class PagesMenu extends Component {
    //#Components
components() {return {PageColumn}}
//#Components
template() {
        return (`<PageColumn>
      <nav >
        <a className='main-nav-a' href='#{R}#login'          >Login</a>
        <a className='main-nav-a' href='#{R}#signup'         >Signup</a>
        <a className='main-nav-a' href='#{R}#selectChat'     >SelectChat</a>
        <a className='main-nav-a' href='#{R}#chat'           >Chat</a>
        <a className='main-nav-a' href='#{R}#error404'       >Error404</a>
        <a className='main-nav-a' href='#{R}#error500'       >Error500</a>
        <a className='main-nav-a' href='#{R}#userSettings'   >UserSettings</a>
      </nav>
    </PageColumn>`);
    }
}
//# sourceMappingURL=pagesMenu.js.map