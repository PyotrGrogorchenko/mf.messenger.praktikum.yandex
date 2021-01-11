import Component from '../../../component/Component'

export default class TestPage extends Component {

  CM_onClick = (data: LooseObject) => {
    this.setState({ btnTestUpdate_text: 'Success!', btnTestUpdate_id: 'newId' })
    const list = this.state.list
    if (data.btnId === 'add') {
      list.push({a:7, b:'8'})
    } else {
      list.pop()
    }
    
    this.setState({ btnTestUpdate_text: 'Success!', btnTestUpdate_id: 'newId', list })
  }

  btnTestUpdate_onClick = () => {
    this.setState({ btnTestUpdate_text: 'Success!' })
  }

  btnTestIf_onClick = () => {
    this.setState({ condition: !this.state.condition })
  }

  state = {
    CM_onClick: this.CM_onClick,
    btnTestUpdate_onClick: this.btnTestUpdate_onClick,
    btnTestUpdate_id: 'button_log-in',
    btnTestUpdate_text: 'Test update',
    condition: true,
    btnTestIf_onClick: this.btnTestIf_onClick,
    list: [{a:1, b:'2'}, {a:3, b:'4'}, {a:5, b:'6'}]
  }

  template() { 

    return  (
      `<div className='right-click-area' id='CM_OwnerId' >
        
        <ButtonMain text='test if' id='test-if' onClick={{state.btnTestIf_onClick}} ></ButtonMain>

          {% if({{state.condition}}) { %}
          //<PageColumn>
            <AuthBarInput text='true'    type='text'     id='true'    value='true'></AuthBarInput> 
            <a>99+</a> 
            //</PageColumn>
          {% } else { %}
          //<PageColumn>
            <AuthBarInput text='false'    type='text'     id='input_login'    value='false'></AuthBarInput> 
            <a>000</a> 
            <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
          //</PageColumn>
          {% } %}

        <ButtonMain text={{state.btnTestUpdate_text}} id={{state.btnTestUpdate_id}} onClick={{state.btnTestUpdate_onClick}} ></ButtonMain>
        
        <ul className='list-test'>
          {% for (let    i   =    0; i < state.list.length; i++) { 
            const listEl = state.list[i];
          %}

            //<PageColumn key={{listEl.a}}>
              <AuthBarInput key={{listEl.a}} id={{listEl.a}} text='true'    type='text'     value='true'></AuthBarInput> 
              <a key={{listEl.a}} id={{listEl.a}}>99+</a> 
              <AnchorMain key={{listEl.a}} id={{listEl.a}} text='Test if' href='#{R}signup'></AnchorMain>
            //</PageColumn>

          {% } %}
        </ul>

        <ContextMenu 
          buttons='add:add|remove:Remove chat'
          onClick={{state.CM_onClick}}
          ownerId='CM_OwnerId'
          menuId='CM_MenuId'
        ></ContextMenu>
      


      </div>`

    ) 
  }
}




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
