import Component from '../../component/component.js';
import PageColumn from '../page-column.js';
export default class PagesMenu extends Component {
    components() { return { PageColumn }; }
    // func (e:Event) {
    //   { console.log(e) }  
    // }
    // state() {return {
    //   func: this.func 
    // }}
    template() {
        return (`<PageColumn>
        <nav >
          <a className="main-nav-a" href="#{R}login"          >Login</a>
          <a className="main-nav-a" href="#{R}signup"         >Signup</a>
          <a className="main-nav-a" href="#{R}selectChat"     >SelectChat</a>
          <a className="main-nav-a" href="#{R}chat"           >Chat</a>
          <a className="main-nav-a" href="#{R}error404"       >Error404</a>
          <a className="main-nav-a" href="#{R}error500"       >Error500</a>
          <a className="main-nav-a" href="#{R}userSettings"   >UserSettings</a>
        </nav>
      </PageColumn>`
        // `<PageColumn>
        //   <div>Messanger</div>
        // </PageColumn>`
        );
    }
}
//# sourceMappingURL=pagesMenu.js.map