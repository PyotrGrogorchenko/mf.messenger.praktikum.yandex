//#Import
import ContextMenu from '../../../components/UI/context-menu/context-menu.js'
import AnchorMain from '../../../components/UI/anchors/anchor-main/anchor-main.js'
import AuthBarInput from '../../../components/auth-bar/auth-bar-input/auth-bar-input.js'
import PageColumn from '../../../components/page-column/page-column.js'
import ButtonMain from '../../../components/UI/buttons/button-main/button-main.js'
//#Import
import Component from '../../../component/Component.js';
export default class TestPage extends Component {
    constructor() {
        super(...arguments);
        this.CM_onClick = (data) => {
            this.setState({ btnTestUpdate_text: 'Success!', btnTestUpdate_id: 'newId' });
            const list = this.state.list;
            if (data.btnId === 'add') {
                list.push({ a: 7, b: '8' });
            }
            else {
                list.pop();
            }
            this.setState({ btnTestUpdate_text: 'ContextMwnu', list });
        };
        this.btnTestUpdate_onClick = () => {
            if (this.state.btnTestUpdate_text === 'Success') {
                this.setState({ btnTestUpdate_text: 'TestUpdate' });
            }
            else {
                this.setState({ btnTestUpdate_text: 'Success' });
            }
        };
        this.btnTestCycle_onClick = () => {
            if (this.state.list.length === 3) {
                this.state.list.push({ a: 11, b: '12' });
            }
            else {
                this.state.list.pop();
            }
            this.setState({ list: this.state.list });
        };
        this.btnTestCycleItemUpdate_onClick = () => {
            const el = this.state.list[1];
            if (el.b === '4') {
                this.state.list[1] = { a: 3, b: '444444' };
                //console.log('2', this.state.list)
            }
            else {
                //console.log('22',this.state.list)
                this.state.list[1] = { a: 3, b: '4' };
            }
            this.setState({ list: this.state.list });
        };
        this.btnTestIf_onClick = () => {
            if (this.state.condition === null) {
                this.setState({ condition: true });
                return;
            }
            this.setState({ condition: null });
            //this.virtDOM?.printNodes()
        };
        this.state = {
            CM_onClick: this.CM_onClick,
            btnTestUpdate_onClick: this.btnTestUpdate_onClick,
            btnTestUpdate_id: 'button_log-in',
            btnTestUpdate_text: 'TestUpdate',
            condition: true,
            conditionR: null,
            btnTestIf_onClick: this.btnTestIf_onClick,
            btnTestCycle_onClick: this.btnTestCycle_onClick,
            list: [{ a: 1, b: '2' }, { a: 3, b: '4' }, { a: 5, b: '6' }],
            btnTestCycleItemUpdate_onClick: this.btnTestCycleItemUpdate_onClick
        };
    }
    //#Components
components() {return {ButtonMain,PageColumn,AuthBarInput,AnchorMain,ContextMenu}}
//#Components
template() {
        return (`<div className='right-click-area' id='CM_OwnerId' >
        
      // <ButtonMain text={{state.btnTestUpdate_text}} id={{state.btnTestUpdate_id}} onClick={{state.btnTestUpdate_onClick}} ></ButtonMain>
      <ButtonMain text='test if' id='test-if' onClick={{state.btnTestIf_onClick}} ></ButtonMain>
      // <ButtonMain text='test cycle' id='test-cycle' onClick={{state.btnTestCycle_onClick}} ></ButtonMain>
      // <ButtonMain text='test cycle item update' id='test-cycle_item_update' onClick={{state.btnTestCycleItemUpdate_onClick}} ></ButtonMain>
      
      {% if({{state.condition}} === null ) { %}
        <PageColumn>
      
          <ul className='list-test'>
          {% for (let    i   =    0; i < state.list.length; i++) { 
            const listEl = state.list[i];
          %}
        
            <li key={{listEl.a}}>
              <AuthBarInput key={{listEl.a}} id={{listEl.a}} text={{listEl.b}}    type='text'     value='{{listEl.b}}></AuthBarInput> 
              <a key={{listEl.a}} id={{listEl.a}}>{{listEl.b}}</a> 
              <AnchorMain key={{listEl.a}} id={{listEl.a}} text={{listEl.b}} href='#{R}signup'></AnchorMain>
            </li>
        
          {% } %}
          </ul>
      
      
          <AuthBarInput text='true'    type='text'     id='true'    value='true'></AuthBarInput> 
          <a>99+</a> 
        </PageColumn>
      
      {% } else { %}
        <PageColumn>
          <AuthBarInput text='false'    type='text'     id='input_login'    value='false'></AuthBarInput> 
          <a>000</a> 
          <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
        </PageColumn>
      {% } %}
      

        // <ContextMenu 
        //   buttons='add:add|remove:Remove chat'
        //   onClick={{state.CM_onClick}}
        //   ownerId='CM_OwnerId'
        //   menuId='CM_MenuId'
        // ></ContextMenu>
              

      </div>`);
    }
}
//   //<ButtonMain text={{state.btnTestUpdate_text}} id={{state.btnTestUpdate_id}} onClick={{state.btnTestUpdate_onClick}} ></ButtonMain>
// {% if({{state.condition}}) { %}
// <PageColumn>
//  <AuthBarInput text='true'    type='text'     id='true'    value='true'></AuthBarInput> 
//  <a>99+</a> 
//   </PageColumn>
// {% } else { %}
// <PageColumn>
//  <AuthBarInput text='false'    type='text'     id='input_login'    value='false'></AuthBarInput> 
//  <a>000</a> 
//  <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
// </PageColumn>
// {% } %}
// <ul className='list-test'>
// {% for (let    i   =    0; i < state.list.length; i++) { 
//   const listEl = state.list[i];
// %}
//   <div key={{listEl.a}}>
//     <AuthBarInput key={{listEl.a}} id={{listEl.a}} text={{listEl.a}}    type='text'     value='{{listEl.b}}></AuthBarInput> 
//     <a key={{listEl.a}} id={{listEl.a}}>{{listEl.a}}</a> 
//     <AnchorMain key={{listEl.a}} id={{listEl.a}} text={{listEl.a}} href='#{R}signup'></AnchorMain>
//   </div>
// {% } %}
// </ul>
// <ul className='list-test'>
// {% for (let    i   =    0; i < state.list.length; i++) { 
//   const listEl = state.list[i];
// %}
//   //<PageColumn key={{listEl.a}}>
//     <AuthBarInput key={{listEl.a}} id={{listEl.a}} text='true'    type='text'     value='true'></AuthBarInput> 
//     <a key={{listEl.a}} id={{listEl.a}}>99+</a> 
//     <AnchorMain key={{listEl.a}} id={{listEl.a}} text='Test if' href='#{R}signup'></AnchorMain>
//   //</PageColumn>
// {% } %}
// </ul>
// <ContextMenu 
// buttons='add:add|remove:Remove chat'
// onClick={{state.CM_onClick}}
// ownerId='CM_OwnerId'
// menuId='CM_MenuId'
// ></ContextMenu>
// {% if({{state.condition}}) { %}
// <AuthBarInput text='login'    type='text'     id='input_login'    value='Test if'></AuthBarInput> 
// {% } else { %}
// <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
// {% } %}
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