// import { xhrPostAuthSignin } from '@xhr'
import { Component } from '@Component'
// import { defaultPage } from '../../../router/utils'

const loginOnClick = (e:Event) => {
  e.preventDefault()

  // eslint-disable-next-line no-console
  console.log('loginOnClick')

  // const formdata = window.getFormData()

  // const body: LooseObject = {}
  // for (const key in formdata.data) {
  //   body[formdata.data[key].name] = formdata.data[key].value
  // }

  // const req = await xhrPostAuthSignin(body)

  // if (req) {
  //   if (req.status === 200) {
  //     defaultPage()
  //   } else if (req.status >= 400) {
  //     alert(`Failed to execute sign in. reason ${req.response.reason}`)
  //   } else {
  //     alert('Failed to execute sign in.')
  //   }
  // }
}

export class Login extends Component {
  state = {

    loginOnClick,

    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    password: ''

  }

  template() {
    return (
      `<PageColumn>
        <AuthForm>
          <AuthHeader text='Log in'></AuthHeader>
          <AuthContent>
            <InputMain text='login'    type='text'     id='input_login'    value={{state.login}}></InputMain>                  
            <InputMain text='password' type='password' id='input_password' value={{state.password}}></InputMain>                  
          </AuthContent>
          <AuthFooter>
            <ButtonMain text='Log in' id='button_log-in' onClick={{state.loginOnClick}}></ButtonMain>
            <ButtonSecondary text='Sign up' id='button_to-sign-up' onClick={{state.loginOnClick}}></ButtonSecondary>
          </AuthFooter>
        </AuthForm>
      </PageColumn>`
    )
  }
}
