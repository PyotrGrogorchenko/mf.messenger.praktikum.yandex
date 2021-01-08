//#Import
import ContextMenu from '../../../components/UI/context-menu/context-menu.js'
import ButtonMain from '../../../components/UI/buttons/button-main/button-main.js'
//#Import
import Component from '../../../component/component.js';
export default class TestPage extends Component {
    constructor() {
        super(...arguments);
        this.CM_onClick = (data) => {
            this.setState({ test: '1' });
        };
        this.state = {
            CM_onClick: this.CM_onClick,
            test: ''
        };
    }
    //#Components
components() {return {ButtonMain,ContextMenu}}
//#Components
template() {
        return (`<div className='right-click-area' id='CM_OwnerId' >
        
        <ButtonMain text='Log in' id='button_log-in' ></ButtonMain>
        
        <ContextMenu 
          buttons='add:add|remove:Remove chat'
          onClick={{state.CM_onClick}}
          ownerId='CM_OwnerId'
          menuId='CM_MenuId'
        ></ContextMenu>
      
      </div>`);
    }
}
// <ContextMenu 
// buttons='add:Add chat|remove:Remove chat'
// onClick={{state.CM_onClick}}
// ownerId='CM_OwnerId'
// menuId='CM_MenuId'
// ></ContextMenu>
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