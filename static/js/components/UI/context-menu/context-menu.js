import Component from '../../../component/Component.js';
class ContextMenu extends Component {
    constructor() {
        super(...arguments);
        this.onClick = (e) => {
            e.preventDefault();
            let btnId = '';
            for (let i = 0; i < e.path.length; i++) {
                if (e.path[i].tagName === 'LI') {
                    btnId = e.path[i].getAttribute('id');
                    break;
                }
            }
            const props = this.getProps();
            props.onClick({ btnId, targetPath: this.targetPath });
        };
        this.state = {
            buttons: this.getButtons(),
            onClick: this.onClick
        };
    }
    componentDidMount() {
        const props = this.getProps();
        const menuArea = document.getElementById(props.ownerId);
        const menu = document.getElementById(props.menuId);
        if (!menuArea && !menu) {
            return;
        }
        menuArea === null || menuArea === void 0 ? void 0 : menuArea.addEventListener('contextmenu', e => {
            e.preventDefault();
            menu.style.top = `${e.clientY}px`;
            menu.style.left = `${e.clientX}px`;
            menu.classList.add('cm_active');
            this.targetPath = e.path;
        }, false);
        menu.addEventListener('click', e => {
            menu.classList.remove('cm_active');
            e.stopPropagation();
        }, false);
    }
    getButtons() {
        const blockButtons = this.getProps().blockButtons.split('|');
        const res = [];
        const getIcon = this.getIcon;
        this.getProps().buttons.split('|').forEach(function (buttonStr) {
            const button = buttonStr.split(':');
            const block = blockButtons.includes(button[0]);
            // const className = 'cm__cm-element'
            //  + block ? ' test' : ''
            //console.log(className)
            res.push({
                id: button[0],
                type: button[1],
                text: button[2],
                icon: getIcon(button[1]),
                block: blockButtons.includes(button[0]),
                className: 'cm__cm-element'.concat(+block ? ' cm-block' : '')
            });
        });
        console.log(res);
        return res;
    }
    getIcon(type) {
        let className = '';
        switch (type) {
            case 'add':
                className = 'fas fa-plus-circle c-gn1';
                break;
            case 'remove':
                className = 'fas fa-minus-circle c-r1';
                break;
            default:
                className = 'fas fa-circle cm-icon_hide';
                break;
        }
        return className + ' ' + 'cm-icon';
    }
    template() {
        return (`<ul className='cm' id={{props.menuId}}>
        {% for (let i = 0; i < state.buttons.length; i++) { 
          const button = state.buttons[i];
        %}
          <li 
            className={{button.className}}
            id={{button.id}}
            key={{button.id}}
            onClick={{state.onClick}}
          >
            <i className={{button.icon}}></i>
            <p>{{button.text}}</p>  
          </li> 
        {% } %}
      </ul>`);
    }
}
export default ContextMenu;
//# sourceMappingURL=context-menu.js.map