import Component from '../../component/component'
import PageColumn from '../page-column'
import AuthBar from '../auth-bar/auth-bar'
import BarHeader from '../auth-bar/bar__header'
import BarContent from '../auth-bar/bar__content'
import AuthBarInput from '../auth-bar/auth-bar-input'
import BarFooter from '../auth-bar/bar__footer'
import ButtonMain from '../UI/buttons/button-main'
import AnchorMain from '../UI/anchors/anchor-main'
import { env } from '../../const/index'
import { HTTPTransport } from '../../xhr/HTTPTransport'
import { Router } from '../../router/Router'

//import { config as dotenv } from 'dotenv/config'
//import * as dotenv from "dotenv"

//require('dotenv')

//dotenv()

export default class Signup extends Component {

  components() {return {PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, AnchorMain}}
  
  async signUpOnClick (e:Event) {
    e.preventDefault()
    
    const formdata = window.getFormData()

    const body: LooseObject = {}
    for (const key in formdata.data){
      body[formdata.data[key].name] = formdata.data[key].value
    }
    
    console.log(body)

    let req: XMLHttpRequest | null

    const httpTransport = new HTTPTransport()
    req = await httpTransport.post(`${env.URL_REQUEST}/auth/signup`, {data:body, withCredentials: true ,headers: {'content-type': 'application/json'}}) as XMLHttpRequest

    if (req) {
      if (req.status === 200) {
        const router = new Router()
        router.defaultPage()
      } else if (req.status >= 400){
        alert(`Failed to execute sign up. reason ${req.response.reason}`)
      } else {
        alert(`Failed to execute sign up.`)
      }  

    } else {
      alert(`Failed to execute sign up.`)
    }
  }

  state() {return {
    
    signUpOnClick: this.signUpOnClick,
  
    first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
    second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
    login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
    email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
    phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
    password: ''
    
  }}




  template() { 

    return  (
      `<PageColumn>
        <AuthBar>
          <BarHeader text='Sign up'></BarHeader>
          
          <BarContent>
            <AuthBarInput text='First name'   type='name'     id='input_first-name'   value={{state.first_name}} ></>                  
            <AuthBarInput text='Second name'  type='name'     id='input_second-name'  value={{state.second_name}} ></>                  
            <AuthBarInput text='Login'        type='login'    id='input_login'        value={{state.login}} ></>                  
            <AuthBarInput text='email'        type='mail'     id='input_email'        value={{state.email}} ></>                  
            <AuthBarInput text='Password'     type='password' id='input_password'     value={{state.password}} ></>                  
            <AuthBarInput text='Phone'        type='phone'    id='input_phone'        value={{state.phone}} ></>                  
          </BarContent>
          
          <BarFooter>
            <ButtonMain text='Sign up'      id='button-sign-up' onClick={{state.signUpOnClick}}></ButtonMain>
            <AnchorMain text='Log in'  id='button-to-log-in' href='#{R}login'></AnchorMain>
          </BarFooter>
        
        </AuthBar>
      </PageColumn>`
    )

  }

}