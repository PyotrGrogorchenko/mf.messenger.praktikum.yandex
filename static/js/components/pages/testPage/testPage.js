//#Import
import ContextMenu from '../../../components/UI/context-menu/context-menu.js'
import AnchorMain from '../../../components/UI/anchors/anchor-main/anchor-main.js'
import AuthBarInput from '../../../components/auth-bar/auth-bar-input/auth-bar-input.js'
import ButtonMain from '../../../components/UI/buttons/button-main/button-main.js'
//#Import
import Component from '../../../component/Component.js';
export default class TestPage extends Component {
    constructor() {
        super(...arguments);
        this.CM_onClick = (data) => {
            this.setState({ btnTestUpdate_text: 'Success!', btnTestUpdate_id: 'newId' });
        };
        this.btnTestUpdate_onClick = () => {
            this.setState({ btnTestUpdate_text: 'Success!', condition: false });
        };
        this.state = {
            CM_onClick: this.CM_onClick,
            btnTestUpdate_onClick: this.btnTestUpdate_onClick,
            btnTestUpdate_id: 'button_log-in',
            btnTestUpdate_text: 'Test update',
            condition: true
        };
    }
    //#Components
components() {return {ButtonMain,AuthBarInput,AnchorMain,ContextMenu}}
//#Components
template() {
        return (`<div className='right-click-area' id='CM_OwnerId' >
        
        <ButtonMain text={{state.btnTestUpdate_text}} id={{state.btnTestUpdate_id}} onClick={{state.btnTestUpdate_onClick}} ></ButtonMain>
      
        {% if({{state.condition}}) { %}
          <AuthBarInput text='login'    type='text'     id='input_login'    value='Test if'></AuthBarInput> 
        {% } else { %}
          <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
        {% } %}
                        

        <ContextMenu 
          buttons='add:add|remove:Remove chat'
          onClick={{state.CM_onClick}}
          ownerId='CM_OwnerId'
          menuId='CM_MenuId'
        ></ContextMenu>
      
      </div>`);
    }
}
// {% if({{state.condition}}) { %}
// <AuthBarInput text='login'    type='text'     id='input_login'    value='Test if'></AuthBarInput> 
// {% } %}
// {% } else { %}
// <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
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