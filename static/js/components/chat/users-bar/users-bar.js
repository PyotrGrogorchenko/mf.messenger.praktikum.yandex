import Component from '../../../component/component.js'
import ButtonToGo from '../../UI/buttons/button-to-go.js'
import InputGray5 from '../../UI/inputs/input-gray5.js'
import UsersBar__UsersList from './users-bar__users-list.js'

class UsersBar extends Component {

  components() {return {ButtonToGo, InputGray5, UsersBar__UsersList}}

  template() { 
    return (
      `<div className="users-bar">
        <form id="form__header" className="users-bar_header">
          <ButtonToGo></ButtonToGo>
          <InputGray5></InputGray5>
        </form>
        <UsersBar__UsersList></UsersBar__UsersList>
      </div>`
    )
  }

}

{/* <div class="users-bar">
  <form id="form__header" class="users-bar_header">
    <a class="button-to-go" id="button-to-profile" rel="stylesheet" href="login.html">
      Profile
      <i class="button-to-go_icon fas fa-caret-right"></i>
    </a>
    <div class="input-gray5">
      <input class="input-gray5__input" type="search" id="input_search" placeholder=" Search">
    </div>
  </form>
  
  
  
  <div class="users-bar__users-list">
    <ul class="users-list__list">
      
      <li class="users-list__user-item">
        <div class="user-item__avatar">
          <div class="avatar">
            <i class="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        <div class="user-item__content">
          <div class="user-item__content-top">
            <h4 class="user-item__username">Sasha</h4>
            <div class="user-item__last-message-time">
              <span class="last-message-time__value">22:15</span>
            </div>
          </div>    
          <div class="user-item__content-bottom">
            <div class="user-item__last-message">
              <b class="hide">You:</b><div class="last-message__value">Для тех, кто любит текст, читайте ниже способ решения этой проблемы.</div>
            </div>
            <div class="user-item__count-message">
              <a class="count-message__value">99+</a>
            </div>
          </div>    
        </div>
      </li>

      <li class="users-list__user-item mark">
        <div class="user-item__avatar">
          <div class="avatar">
            <i class="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        <div class="user-item__content">
          <div class="user-item__content-top">
            <h4 class="user-item__username">Liza</h4>
            <div class="user-item__last-message-time">
              <span class="last-message-time__value">Mon</span>
            </div>
          </div>    
          <div class="user-item__content-bottom">
            <div class="user-item__last-message">
              <b>You:</b><div class="last-message__value">Для тех, кто любит текст, читайте ниже способ решения этой проблемы.</div>
            </div>
            <div class="user-item__count-message hide">
              <a class="count-message__value">99+</a>
            </div>
          </div>    
        </div>
      </li>

      <li class="users-list__user-item">
        <div class="user-item__avatar">
          <div class="avatar">
            <i class="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        <div class="user-item__content">
          <div class="user-item__content-top">
            <h4 class="user-item__username">Ruport</h4>
            <div class="user-item__last-message-time">
              <span class="last-message-time__value">12 Apr 2020</span>
            </div>
          </div>    
          <div class="user-item__content-bottom">
            <div class="user-item__last-message">
              <b class="hide">You:</b><a class="last-message__value">Пока!</a>
            </div>
            <div class="user-item__count-message">
              <a class="count-message__value">1</a>
            </div>
          </div>    
        </div>
      </li>

      <li class="users-list__user-item">
        <div class="user-item__avatar">
          <div class="avatar">
            <i class="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        <div class="user-item__content">
          <div class="user-item__content-top">
            <h4 class="user-item__username">Ruport</h4>
            <div class="user-item__last-message-time">
              <span class="last-message-time__value">12 Apr 2020</span>
            </div>
          </div>    
          <div class="user-item__content-bottom">
            <div class="user-item__last-message">
              <b class="hide">You:</b><a class="last-message__value">Пока!</a>
            </div>
            <div class="user-item__count-message">
              <a class="count-message__value">1</a>
            </div>
          </div>    
        </div>
      </li>

      <li class="users-list__user-item">
        <div class="user-item__avatar">
          <div class="avatar">
            <i class="color-gray3 fas fa-camera"></i>
          </div>
        </div>
        <div class="user-item__content">
          <div class="user-item__content-top">
            <h4 class="user-item__username">Ruport</h4>
            <div class="user-item__last-message-time">
              <span class="last-message-time__value">12 Apr 2020</span>
            </div>
          </div>    
          <div class="user-item__content-bottom">
            <div class="user-item__last-message">
              <b class="hide">You:</b><a class="last-message__value">Пока!</a>
            </div>
            <div class="user-item__count-message">
              <a class="count-message__value">1</a>
            </div>
          </div>    
        </div>
      </li>


    </ul>
  </div>
</div> */}



export default UsersBar