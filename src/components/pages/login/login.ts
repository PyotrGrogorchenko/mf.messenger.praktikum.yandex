import { xhrPostAuthSignin } from '@xhr'
import Component from '../../../component/Component'
import { defaultPage } from '../../../router/utils'

export default class Login extends Component {
  async loginOnClick(e:Event) {
    e.preventDefault()

    const formdata = window.getFormData()

    const body: LooseObject = {}
    for (const key in formdata.data) {
      body[formdata.data[key].name] = formdata.data[key].value
    }

    const req = await xhrPostAuthSignin(body)

    if (req) {
      if (req.status === 200) {
        defaultPage()
      } else if (req.status >= 400) {
        alert(`Failed to execute sign in. reason ${req.response.reason}`)
      } else {
        alert('Failed to execute sign in.')
      }
    }
  }

  state = {

    loginOnClick: this.loginOnClick,

    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    password: ''

  }

  template() {
    return (
      `<PageColumn>
        <AuthBarForm>
          <Bar__Header text='Log in'></Bar__Header>
          <Bar__Content>
            <AuthBarInput text='login'    type='text'     id='input_login'    value={{state.login}}></AuthBarInput>                  
            <AuthBarInput text='password' type='password' id='input_password' value={{state.password}}></AuthBarInput>                  
          </Bar__Content>
          <Bar__Footer>
            <ButtonMain text='Log in' id='button_log-in' onClick={{state.loginOnClick}}></ButtonMain>
            <AnchorMain text='Sign up' id='button_to-sign-up' href='#{R}#signup'></AnchorMain>
          </Bar__Footer>
        </AuthBarForm>
      </PageColumn>`
    )
  }
}
