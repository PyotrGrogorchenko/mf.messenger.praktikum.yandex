import Component from '../../component/component'
import PageColumn from '../page-column'
import AuthBar from '../auth-bar/auth-bar'
import BarHeader from '../auth-bar/bar__header'
import BarContent from '../auth-bar/bar__content'
import AuthBarInput from '../auth-bar/auth-bar-input'
import BarFooter from '../auth-bar/bar__footer'
import ButtonMain from '../UI/buttons/button-main'
import ButtonSecondary from '../UI/buttons/button-secondary'
import PageId from '../pageId'

export default class Login extends Component {

  components() {return {PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary, PageId}}
  
  state() {return {
    btnLogIn: {id: 'button_log-in'},  
    btnSignUp: {id: 'button_to-sign-up'},  
    inputLogin: {text: 'login', type: 'text', id: 'input_login'},
    inputPassword: {text: 'password', type: 'password', id: 'input_password'}  
  }}

  template() { 

    return  (
      `<PageId pageId='login'></PageId>
      <PageColumn>
        <AuthBar>
          <BarHeader text='Log in'></BarHeader>
            <BarContent>
            <AuthBarInput 
              text={{state.inputLogin.text}}
              type={{state.inputLogin.type}}
              id={{state.inputLogin.id}}
            ></AuthBarInput>                  
            <AuthBarInput
              text={{state.inputPassword.text}}
              type={{state.inputPassword.type}}
              id={{state.inputPassword.id}}
            ></AuthBarInput>                  
          </BarContent>
          <BarFooter>
            <ButtonMain
              text='Log in'
              id={{state.btnLogIn.id}}
              href='#{R}selectChat'
            ></ButtonMain>
            <ButtonSecondary 
              text='Sign up'
              id={{state.btnSignUp.id}}
              href='#{R}signup'
            ></ButtonSecondary>
          </BarFooter>
        </AuthBar>
      </PageColumn>`
    )

  }

}