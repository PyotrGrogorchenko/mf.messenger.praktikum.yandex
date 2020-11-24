import Component from '../../component/component'
import PageColumn from '../page-column'
import AuthBar from '../auth-bar/auth-bar-form'
import BarHeader from '../auth-bar/bar__header/bar__header'
import BarContent from '../auth-bar/bar__content/bar__content'
import AuthBarInput from '../auth-bar/auth-bar-input/auth-bar-input'
import BarFooter from '../auth-bar/bar__footer/bar__footer'
import ButtonMain from '../UI/buttons/button-main'
import AnchorMain from '../UI/anchors/anchor-main'
import { HTTPTransport } from '../../xhr/HTTPTransport'
import { env } from '../../const/index'
import { Router } from '../../router/Router'

export default class Login extends Component {

  components() {return {PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, AnchorMain}}
  
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
  
  state() {return {
  
    loginOnClick: this.loginOnClick,

    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    password: ''
  
  }}

  template() { 

    return  (
      `<PageColumn>
        <AuthBar>
          <BarHeader text='Log in'></BarHeader>
          <BarContent>
            <AuthBarInput text='login'    type='text'     id='input_login'    value={{state.login}}></AuthBarInput>                  
            <AuthBarInput text='password' type='password' id='input_password' value={{state.password}}></AuthBarInput>                  
          </BarContent>
          <BarFooter>
            <ButtonMain text='Log in' id='button_log-in' onClick={{state.loginOnClick}}></ButtonMain>
            <AnchorMain text='Sign up' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
          </BarFooter>
        </AuthBar>
      </PageColumn>`
    )

  }

}