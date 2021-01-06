import Component from '../../../component/component'
import { HTTPTransport } from '../../../xhr/HTTPTransport'
import { env } from '../../../const/index'
import { Router } from '../../../router/Router'

export default class Login extends Component {

  async loginOnClick (e:Event) {
    e.preventDefault()
    
    const formdata = window.getFormData()

    console.log(formdata)

    const body: LooseObject = {}
    for (const key in formdata.data){
      body[formdata.data[key].name] = formdata.data[key].value
    }
    
    //console.log(body)

    let req: XMLHttpRequest | null

    try {
      const httpTransport = new HTTPTransport()
      req = await httpTransport.post(`${env.URL_REQUEST}/auth/signin`, {data:body, withCredentials: true ,headers: {'content-type': 'application/json'}}) as XMLHttpRequest
    } catch (error) {
      req = null
      console.log('err', error)  
    }

    if (req) {
      
      if (req.status === 200) {
        const router = new Router()
        router.defaultPage()
      } else if (req.status >= 400){
        alert(`Failed to execute sign in. reason ${req.response.reason}`)
      } else {
        alert(`Failed to execute sign in.`)
      }  
      
    }
  }
  
  state = {
  
    loginOnClick: this.loginOnClick,

    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    password: ''
  
  }

  template() { 

    return  (
      `<PageColumn>
        <AuthBarForm>
          <Bar__Header text='Log in'></Bar__Header>
          <Bar__Content>
            <AuthBarInput text='login'    type='text'     id='input_login'    value={{state.login}}></AuthBarInput>                  
            <AuthBarInput text='password' type='password' id='input_password' value={{state.password}}></AuthBarInput>                  
          </Bar__Content>
          <Bar__Footer>
            <ButtonMain text='Log in' id='button_log-in' onClick={{state.loginOnClick}}></ButtonMain>
            <AnchorMain text='Sign up' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
          </Bar__Footer>
        </AuthBarForm>
      </PageColumn>`
    )

  }

}