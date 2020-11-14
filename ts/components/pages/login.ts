import Component from '../../component/component.js'
import PageColumn from '../page-column.js'
import AuthBar from '../auth-bar/auth-bar.js'
import BarHeader from '../auth-bar/bar__header.js'
import BarContent from '../auth-bar/bar__content.js'
import AuthBarInput from '../auth-bar/auth-bar-input.js'
import BarFooter from '../auth-bar/bar__footer.js'
import ButtonMain from '../UI/buttons/button-main.js'
import ButtonSecondary from '../UI/buttons/button-secondary.js'

export default class Login extends Component {

  components() {return {PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary}}
  
  state() {return {
    btnLogIn: {id: 'button_log-in'},  
    btnSignUp: {id: 'button_to-sign-up'},  
    inputLogin: {text: 'login', type: 'text', id: 'input_login'},
    inputPassword: {text: 'password', type: 'password', id: 'input_password'}  
  }}

  template() { 

    return  (
      `<PageColumn>
        <AuthBar>
          <BarHeader text='Log in'></BarHeader>
            <BarContent>
            <AuthBarInput 
              text={{state.inputLogin.text}}
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

// const root: HTMLElement | null = document.querySelector(".app")
// const app: App = new App()
// app.render(root)







