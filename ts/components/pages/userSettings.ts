import Component from '../../component/component'
import PageColumn from '../page-column'
import UserSettingsBar from '../user-settings/user-settings-bar'
import BarHeader from '../auth-bar/bar__header/bar__header'
import BarContent from '../auth-bar/bar__content/bar__content'
import UserSettingsBarInput from '../user-settings/user-settings-bar-input'
import BarFooter from '../auth-bar/bar__footer/bar__footer'
import ButtonMain from '../UI/buttons/button-main'
import ButtonSecondary from '../UI/buttons/button-secondary'
import { HTTPTransport } from '../../xhr/HTTPTransport'
import { env } from '../../const/index'
import { Router } from '../../router/Router'

export default class UserSettings extends Component {

  components() {return {PageColumn, UserSettingsBar, BarHeader, BarContent, UserSettingsBarInput, BarFooter, ButtonMain, ButtonSecondary}}

  // componentDidMount() {
  //   console.
  // }

  async logoutOnClick (e:Event) {
    e.preventDefault()
    
    let req: XMLHttpRequest | null

    try {
      const httpTransport = new HTTPTransport()
      req = await httpTransport.post(`${env.URL_REQUEST}/auth/logout`, {withCredentials: true ,headers: {'content-type': 'application/json'}}) as XMLHttpRequest
    } catch (error) {
      req = null
    }

    if (req){
      if (req.status === 200) {
        const router = new Router()
        router.defaultPage()
      }
    }else {
      alert(`Failed to execute log out`)
    }    

  }
  
  state() {return {
    logoutOnClick: this.logoutOnClick,

    first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
    second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
    phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
    oldPassword: '',
    newPassword: ''
  
  }}

  template() { 

    return  (
      `<PageColumn>
        <UserSettingsBar>
          
          <BarHeader text='User settings'></BarHeader>
          
          <BarContent>
            <UserSettingsBarInput text='First name'       type='text'       id='input_first-name'   value={{state.first_name}} ></>                  
            <UserSettingsBarInput text='Second name'      type='text'       id='input_second-name'  value={{state.second_name}}  ></>                  
            <UserSettingsBarInput text='Login'            type='text'       id='input_login'        value={{state.login}}  ></>                  
            <UserSettingsBarInput text='Email'            type='email'      id='input_email'        value={{state.email}}  ></>                  
            <UserSettingsBarInput text='Phone'            type='tel'        id='input_phone'        value={{state.phone}}  ></>                  
            <UserSettingsBarInput text='Old password'     type='password'   id='input_old-password' value={{state.oldPassword}}  ></>                  
            <UserSettingsBarInput text='New password'     type='password'   id='input_new-password' value={{state.newPassword}}  ></>                  
          </BarContent>
          
          <BarFooter>
            <ButtonMain text='Save' id='button_save'></ButtonMain>
            <ButtonSecondary text='Log out' id='button_log-out' onClick={{state.logoutOnClick}}></ButtonSecondary>
          </BarFooter>
        
        </UserSettingsBar>
      </PageColumn>`
    )

  }

} 