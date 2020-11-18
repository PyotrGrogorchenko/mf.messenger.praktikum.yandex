import Component from '../../component/component'
import PageColumn from '../page-column'
import AuthBar from '../auth-bar/auth-bar'
import BarHeader from '../auth-bar/bar__header'
import BarContent from '../auth-bar/bar__content'
import AuthBarInput from '../auth-bar/auth-bar-input'
import BarFooter from '../auth-bar/bar__footer'
import ButtonMain from '../UI/buttons/button-main'
import ButtonSecondary from '../UI/buttons/button-secondary'
import { DB } from '../../constants/index'
import { HTTPTransport } from '../../request/fetch'
import PageId from '../pageId'

export default class Signup extends Component {

  components() {return {PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary, PageId}}
  
  signUpOnClick (e:Event) {
    e.preventDefault()
    
    const formdata = window.getFormData()

    if (!formdata.valid) {
      alert('Fields are filled in incorrectly!')
    }

    const body: LooseObject = {}
    for (const key in formdata.data){
      body[formdata.data[key].name] = formdata.data[key].value
    }
    

    console.log(body)
    //const requestURL = 'https://ya-praktikum.tech/api/v2'
    const httpTransport = new HTTPTransport()
    httpTransport.post(`${DB.requestURL}/auth/signup`, {data:body, headers: {'content-type': 'application/json'}})
      .then(data => console.log('post', data))
      .catch(err => console.log(err))
}

  state() {return {
    signUpOnClick: this.signUpOnClick 
  }}




  template() { 

    return  (
      `<PageId pageId='signup'></PageId>
      <PageColumn>
        <AuthBar>
          <BarHeader text='Sign up'></BarHeader>
          
          <BarContent>
            <AuthBarInput text='First name'   type='name'     id='input_first-name'   ></>                  
            <AuthBarInput text='Second name'  type='name'     id='input_second-name'  ></>                  
            <AuthBarInput text='Login'        type='login'    id='input_login'        ></>                  
            <AuthBarInput text='email'        type='mail'     id='input_email'        ></>                  
            <AuthBarInput text='Password'     type='password' id='input_password'     ></>                  
            <AuthBarInput text='Phone'        type='phone'    id='input_phone'        ></>                  
          </BarContent>
          
          <BarFooter>
            <ButtonMain text='Sign up'      id='button-sign-up' onClick={{state.signUpOnClick}}></ButtonMain>
            <ButtonSecondary text='Log in'  id='button-to-log-in' href='#{R}login'></ButtonSecondary>
          </BarFooter>
        
        </AuthBar>
      </PageColumn>`
    )

  }

}