import Component from '../../component/component.js'
import PageColumn from '../page-column.js'
import AuthBar from '../auth-bar/auth-bar.js'
import BarHeader from '../auth-bar/bar__header.js'
import BarContent from '../auth-bar/bar__content.js'
import AuthBarInput from '../auth-bar/auth-bar-input.js'
import BarFooter from '../auth-bar/bar__footer.js'
import ButtonMain from '../UI/buttons/button-main.js'
import ButtonSecondary from '../UI/buttons/button-secondary.js'
import { DB } from '../../constants/index.js'
import { HTTPTransport } from '../../request/fetch.js'

export default class Signup extends Component {

  components() {return {PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary}}
  
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
      `<PageColumn>
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