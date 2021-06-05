import { Component } from '@Component'

export class Test extends Component {
  CM_onClick = (data: LooseObject) => {
    this.setState({ btnTestUpdate_text: 'Success!', btnTestUpdate_id: 'newId' })
    const { list } = this.state
    if (data.btnId === 'add') {
      list.push({ a: 7, b: '8' })
    } else {
      list.pop()
    }

    this.setState({ btnTestUpdate_text: 'ContextMwnu', list })
  }

  btnTestUpdate_onClick = () => {
    if (this.state.btnTestUpdate_text === 'Success') {
      this.setState({ btnTestUpdate_text: 'TestUpdate' })
    } else {
      this.setState({ btnTestUpdate_text: 'Success' })
    }
  }

  btnTestCycle_onClick = () => {
    if (this.state.list.length === 3) {
      this.state.list.push({ a: 11, b: '12' })
    } else {
      this.state.list.pop()
    }

    this.setState({ list: this.state.list })
  }

  btnTestCycleItemUpdate_onClick = () => {
    const el = this.state.list[1]
    if (el.b === '4') {
      this.state.list[1] = { a: 3, b: '444444' }
      // console.log('2', this.state.list)
    } else {
      // console.log('22',this.state.list)
      this.state.list[1] = { a: 3, b: '4' }
    }

    this.setState({ list: this.state.list })
  }

  btnTestIf_onClick = () => {
    if (this.state.condition === null) {
      this.setState({ condition: true })
      return
    }

    this.setState({ condition: null })
    // this.virtDOM?.printNodes()
  }

  state = {
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

  }

  template() {
    return (
      `<label 
        className='auth-bar-input__label'
      >'test'</label>`

    // `<div className='right-click-area' id='CM_OwnerId' >

    // <Button
    //   text='test if'
    //   id='test-if'
    //   onClick={{state.btnTestIf_onClick}}>
    // </Button>

    // {% if({{state.condition}} === null ) { %}
    //   <PageColumn>

    //     {% for (let    i   =    0; i < state.list.length; i++) {
    //       const listEl = state.list[i];
    //       %}

    //       <li key={{listEl.a}}>
    //         <InputMain
    //           key={{listEl.a}}
    //           id={{listEl.a}}
    //           text={{listEl.b}}
    //           type='text'
    //           value='{{listEl.b}}
    //         ></InputMain>
    //         <a
    //           key={{listEl.a}}
    //           id={{listEl.a}}
    //         >{{listEl.b}}</a>
    //         <AnchorMain
    //           key={{listEl.a}}
    //           id={{listEl.a}}
    //           text={{listEl.b}}
    //           href='#{R}#signup'
    //         ></AnchorMain>
    //       </li>

    //     {% } %}

    //   </PageColumn>

    // {% } else { %}
    //   <PageColumn>
    //   </PageColumn>
    // {% } %}

    //   // <ContextMenu
    //   //   buttons='add:add|remove:Remove chat'
    //   //   onClick={{state.CM_onClick}}
    //   //   ownerId='CM_OwnerId'
    //   //   menuId='CM_MenuId'
    //   // ></ContextMenu>

    // </div>`

    )
  }
}

//     <ul className='list-test'>
//     {% for (let    i   =    0; i < state.list.length; i++) {
//       const listEl = state.list[i];
//     %}

//       <li key={{listEl.a}}>
//         <InputMain key={{listEl.a}} id={{listEl.a}} text={{listEl.b}}    type='text'     value='{{listEl.b}}></InputMain>
//         <a key={{listEl.a}} id={{listEl.a}}>{{listEl.b}}</a>
//         <AnchorMain key={{listEl.a}} id={{listEl.a}} text={{listEl.b}} href='#{R}#signup'></AnchorMain>
//       </li>

//     {% } %}
//     </ul>

//     <InputMain text='true'    type='text'     id='true'    value='true'></InputMain>
//     <a>99+</a>

//     <InputMain text='false'    type='text'     id='input_login'    value='false'></InputMain>
//     <a>000</a>
//     <AnchorMain text='Test if' id='button_to-sign-up' href='#{R}#signup'></AnchorMain>
