import Component from '../../../../../component/Component'

class SearchUser__Item extends Component {

  li_onClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    let arrli: Array<HTMLElement> = e.path.filter((el: HTMLElement) => el.nodeName === 'LI')
    if (arrli.length === 0) { return }
    let elLi = arrli[0]
    
    let id = null
    if (elLi) { id = elLi.getAttribute('id') }

    this.getProps().callback(id)

  }

  state = {
    li_onClick: this.li_onClick
  }

  template() { 
    return (
      `<li 
        className='search-user__item' 
        id={{props.id}} 
        key={{props.key}} 
        onClick={{state.li_onClick}}
      >
        <div className='search-user__item-avatar'>
          <Avatar avatar={{props.avatar}}></Avatar>
        </div>
        <div className='search-item__content'>
          <p>{{props.login}}</p>
        </div>
      </li>`
    )
  }

}

export default SearchUser__Item