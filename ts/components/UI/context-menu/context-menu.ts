import Component from '../../../component/component'

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
    const res: Array<object> = []
    const getIcon = this.getIcon
    this.getProps().buttons.split('|').forEach(function(buttonStr: string) {
      const button = buttonStr.split(':')
      res.push({id: button[0], text: button[1], icon: getIcon(button[0])})    
    })
    return res
  }

  getIcon(type: string): string {
    let className = ''
    switch(type) {
      case 'add':
        className = 'fas fa-plus-circle c-gn1'; break;
      case 'remove':
        className = 'fas fa-minus-circle c-r1'; break;  
      default:
        className = 'fas fa-circle cm-icon_hide'; break;
    }  
    return className + ' ' + 'cm-icon'
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
      `<menu className='cm' id={{props.menuId}}>
        {% for (let i = 0; i < state.buttons.length; i++) { 
          const button = state.buttons[i];
          //const onClick = props.onClick[i];
        %}
          <li 
          className='cm__cm-element'
            id={{button.id}}
            onClick={{state.onClick}}
          >
            <i className={{button.icon}}></i>
            <span>{{button.text}}</span>  
          </li> 
        {% } %}
      </div>`
    )
  }

}

export default ContextMenu