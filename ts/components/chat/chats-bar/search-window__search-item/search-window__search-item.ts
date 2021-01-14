import Component from '../../../../component/Component'

class SearchWindow__SearchItem extends Component {

  li_onClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    let elLi = null
    for(let i = 0; i < e.path.length; i++) {
      if (e.path[i].tagName.toUpperCase() === 'LI') {
        elLi = e.path[i]
        break
      }
    }
    
    let id = null
    if (elLi) {
      id = elLi.getAttribute('id')
    }

    this.getProps().callback(id)

  }

  state = {
    li_onClick: this.li_onClick
  }

  template() { 
    return (
      `<li 
        className='search-window__search-item' 
        id={{props.id}} 
        key={{props.key}} 
        onClick={{state.li_onClick}}
      >
        <div className='search-item__avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>
        </div>
        <div className='search-item__content'>
          <p>{{props.login}}</p>
        </div>
      </li>`
    )
  }

}

export default SearchWindow__SearchItem