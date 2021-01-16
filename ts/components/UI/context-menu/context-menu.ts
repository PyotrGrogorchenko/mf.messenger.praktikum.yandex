import Component from '../../../component/Component'

class ContextMenu extends Component {

  targetPath: any

  componentDidMount(){
    const props = this.getProps()  
    const menuArea = document.getElementById(props.ownerId)
    const menu = document.getElementById(props.menuId)
    
    if (!menuArea && !menu){
      return
    }
    
    menuArea?.addEventListener('contextmenu', e => {
      e.preventDefault();
      (menu as HTMLElement).style.top = `${e.clientY}px`;
      (menu as HTMLElement).style.left = `${e.clientX}px`;
      (menu as HTMLElement).classList.add('cm_active')
      this.targetPath = e.path
    }, false);
  
    (menu as HTMLElement).addEventListener('click', e => {
      (menu as HTMLElement).classList.remove('cm_active')
      e.stopPropagation();
    }, false);
    
  }

  getButtons () {
    const blockButtons = this.getProps().blockButtons ? this.getProps().blockButtons.split('|') : []
    const res: Array<object> = []
    const getIconclassName = this.getIconclassName
    this.getProps().buttons.split('|').forEach(function(buttonStr: string) {
      const button = buttonStr.split(':')
      const block = blockButtons.includes(button[0])
      res.push({
                    id: button[0], 
                    type: button[1], 
                    text: button[2], 
                    block: blockButtons.includes(button[0]),
                    li_className: 'cm__cm-element',
                    i_className: getIconclassName(button[1], block),
                    p_className:  block ? 'cm-block' : ''
                })    
    })
    return res
  }

  getIconclassName(type: string, block: boolean): string {
    let className = ''
    switch(type) {
      case 'add':
        className = 'fas fa-plus-circle c-gn1'; break;
      case 'remove':
        className = 'fas fa-minus-circle c-r1'; break;  
      default:
        className = 'fas fa-circle cm-icon_hide'; break;
    }  
    return className.concat(' cm-icon').concat( block ? ' cm-block' : '')
  }

  onClick = (e: MouseEvent) => {
    e.preventDefault()
    let btnId = ''
    for (let i = 0; i < e.path.length; i++) { 
      if (e.path[i].tagName === 'LI') {
        btnId = e.path[i].getAttribute('id') as string
        break
      }
    }
    const props = this.getProps()  
    props.onClick({btnId, targetPath: this.targetPath} )
  }

  state = {
    buttons: this.getButtons(),
    onClick: this.onClick
  }

  template() { 
    return (
      `<ul className='cm' id={{props.menuId}}>
        {% for (let i = 0; i < state.buttons.length; i++) { 
          const button = state.buttons[i];
        %}
          <li 
            className={{button.li_className}}
            id={{button.id}}
            key={{button.id}}
            onClick={{state.onClick}}
          >
            <i className={{button.i_className}}></i>
            <p className={{button.p_className}}>{{button.text}}</p>  

          </li> 
        {% } %}
      </ul>`
    )
  }

}

export default ContextMenu