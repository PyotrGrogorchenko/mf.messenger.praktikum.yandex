import Component from '../../../component/component.js';
class ContextMenu extends Component {
    componentDidMount() {
        const props = this.getProps();
        const menuArea = document.getElementById(props.ownerId);
        const menu = document.getElementById(props.menuId);
        if (!menuArea && !menu) {
            return;
        }
        menuArea === null || menuArea === void 0 ? void 0 : menuArea.addEventListener("contextmenu", e => {
            e.preventDefault();
            menu.style.top = `${e.clientY}px`;
            menu.style.left = `${e.clientX}px`;
            menu.classList.add("cm_active");
        }, false);
        menu.addEventListener("click", e => {
            menu.classList.remove("cm_active");
            e.stopPropagation();
        }, false);
    }
    getButtons() {
        const res = [];
        const getIcon = this.getIcon;
        this.getProps().buttons.split('|').forEach(function (buttonStr) {
            const button = buttonStr.split(':');
            res.push({ id: button[0], text: button[1], icon: getIcon(button[0]) });
        });
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
    state() {
        return {
            buttons: this.getButtons()
        };
    }
    template() {
        return (`<menu className='cm' id={{props.menuId}}>
        {% for (let i = 0; i < state.buttons.length; i++) { 
          const button = state.buttons[i];
        %}
          <li 
          className='cm__cm-element'
            id={{button.id}}
            onClick={{props.onClick}}
          >
            <i className={{button.icon}}></i>
            <span>{{button.text}}</span>  
          </li> 
        {% } %}
      </div>`);
    }
}
//className="fas fa-long-arrow-alt-right"
export default ContextMenu;
//# sourceMappingURL=context-menu.js.map