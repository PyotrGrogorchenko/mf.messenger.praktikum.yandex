import Component from '../../../component/component'

export default class TestPage extends Component {

  CM_onClick = (data: LooseObject) => {
    this.setState({test: '1'})
  }

  state = {
    CM_onClick: this.CM_onClick,
    test: ''
  }

  template() { 

    return  (
      `<div className='right-click-area' id='CM_OwnerId' >
        
        <ButtonMain text='Log in' id='button_log-in' ></ButtonMain>
        
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
