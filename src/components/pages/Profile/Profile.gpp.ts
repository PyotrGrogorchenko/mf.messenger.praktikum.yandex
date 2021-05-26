// import { xhrPostLogout } from '@xhr'
import { Component } from '@Component'
// import { defaultPage } from '@utils'

const logoutOnClick = (e:Event) => {
  e.preventDefault()

  // eslint-disable-next-line no-console
  console.log('logoutOnClick')

  // const req = await xhrPostLogout()

  // if (req) {
  //   if (req.status === 200) {
  //     defaultPage()
  //   }
  // } else {
  //   alert('Failed to execute log out')
  // }
}

export class Profile extends Component {
  state = {

    logoutOnClick,

    first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
    second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
    phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
    oldPassword: '',
    newPassword: ''

  }

  template() {
    return (
      `<PageColumn>
        <AuthForm>
          
          <AuthHeader text='Profile'></>
          
          <AuthContent>
            <InputMain text='First name' type='text' id='input_first-name' value={{state.first_name}}></>                  
            <InputMain text='Second name' type='text' id='input_second-name' value={{state.second_name}}></>                  
            <InputMain text='Login' type='text' id='input_login' value={{state.login}}></>                  
            <InputMain text='Email' type='email' id='input_email' value={{state.email}}></>                  
            <InputMain text='Phone' type='tel' id='input_phone' value={{state.phone}}></>                  
            <InputMain text='Old password'     type='password' id='input_old-password' value={{state.oldPassword}}></>                  
            <InputMain text='New password'     type='password' id='input_new-password' value={{state.newPassword}}></>                  
          </AuthContent>
          
          <AuthFooter>
            <ButtonMain text='Save' id='button_save'></ButtonMain>
            <ButtonSecondary text='Log out' id='button_log-out' onClick={{state.logoutOnClick}}></ButtonSecondary>
          </AuthFooter>
        
        </AuthForm>
      </PageColumn>`
    )
  }
}
