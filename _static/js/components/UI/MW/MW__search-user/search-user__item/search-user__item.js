//#Import
import Avatar from '../../../../../components/img/avatar/avatar.js'
//#Import
import Component from '../../../../../component/Component.js';
class SearchUser__Item extends Component {
    constructor() {
        super(...arguments);
        this.li_onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let arrli = e.path.filter((el) => el.nodeName === 'LI');
            if (arrli.length === 0) {
                return;
            }
            let elLi = arrli[0];
            let id = null;
            if (elLi) {
                id = elLi.getAttribute('id');
            }
            this.getProps().callback(id);
        };
        this.state = {
            li_onClick: this.li_onClick
        };
    }
    //#Components
components() {return {Avatar}}
//#Components
template() {
        return (`<li 
        className='search-user__item' 
        id={{props.id}} 
        key={{props.key}} 
        onClick={{state.li_onClick}}
      >
        <div className='search-user__item-avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>
        </div>
        <div className='search-item__content'>
          <p>{{props.login}}</p>
        </div>
      </li>`);
    }
}
export default SearchUser__Item;
//# sourceMappingURL=search-user__item.js.map