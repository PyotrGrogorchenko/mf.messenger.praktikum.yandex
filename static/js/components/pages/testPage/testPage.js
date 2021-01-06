//#Import
import ContextMenu from '../../../components/UI/context-menu/context-menu.js'
//#Import
import Component from '../../../component/component.js';
export default class TestPage extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            CM_OwnerId: 'CM_OwnerId',
            CM_MenuId: 'CM_MenuId',
            CM_OnClick: this.CM_OnClick
        };
    }
    // CM = contextMenu
    CM_OnClick(e) {
        e.preventDefault();
        console.log(e);
    }
    //#Components
components() {return {ContextMenu}}
//#Components
template() {
        return (`<div className='right-click-area' id='CM_OwnerId' >

        <ContextMenu 
          buttons='add:Add chat|remove:Remove chat|test:test'
          onClick={{state.CM_OnClick}}
          ownerId={{state.CM_OwnerId}}
          menuId={{state.CM_MenuId}}
        ></ContextMenu>

      </div>`);
    }
}
// `<PageColumn>
// <div class="right-click-area">
//   <div class="text">
//     Я - волшебный квадракул
//     <br>
//     Тыц правой кнопкой мышки!
//   </div>
//   <ContextMenu buttons='add:Add chat|remove:Remove chat' onClick={{state.contextMenuOnClick}}></ContextMenu>
// </div>
// <PageColumn>`
//# sourceMappingURL=testPage.js.map