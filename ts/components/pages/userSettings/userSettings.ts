import Component from '../../../component/component'
import { HTTPTransport } from '../../../xhr/HTTPTransport'
import { env } from '../../../const/index'
import { Router } from '../../../router/Router'

export default class UserSettings extends Component {

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
          
          <Bar__Header text='User settings'></Bar__Header>
          
          <Bar__Content>
            <UserSettingsBarInput text='First name'       type='text'       id='input_first-name'   value={{state.first_name}} ></>                  
            <UserSettingsBarInput text='Second name'      type='text'       id='input_second-name'  value={{state.second_name}}  ></>                  
            <UserSettingsBarInput text='Login'            type='text'       id='input_login'        value={{state.login}}  ></>                  
            <UserSettingsBarInput text='Email'            type='email'      id='input_email'        value={{state.email}}  ></>                  
            <UserSettingsBarInput text='Phone'            type='tel'        id='input_phone'        value={{state.phone}}  ></>                  
            <UserSettingsBarInput text='Old password'     type='password'   id='input_old-password' value={{state.oldPassword}}  ></>                  
            <UserSettingsBarInput text='New password'     type='password'   id='input_new-password' value={{state.newPassword}}  ></>                  
          </Bar__Content>
          
          <Bar__Footer>
            <ButtonMain text='Save' id='button_save'></ButtonMain>
            <ButtonSecondary text='Log out' id='button_log-out' onClick={{state.logoutOnClick}}></ButtonSecondary>
          </Bar__Footer>
        
        </UserSettingsBar>
      </PageColumn>`
    )

  }

} 