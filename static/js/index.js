import Block from './component/block.js'
import PageColumn from './components/page-column.js'
import FormMain from './components/auth-bar/form__main.js'
import BarHeader from './components/auth-bar/bar__header.js'
import BarContent from './components/auth-bar/bar__content.js'
import AuthBarInput from './components/auth-bar/auth-bar-input.js'
import BarFooter from './components/auth-bar/bar__footer.js'
import ButtonMain from './components/auth-bar/button-main.js'
import ButtonSecondary from './components/auth-bar/button-secondary.js'

class App extends Block {

  components() {return {PageColumn, FormMain, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary}}
  
  state() {return {
    btnLogIn: {id: 'button_log-in'},  
    btnSignUp: {id: 'button_to-sign-up'},  
    inputLogin: {text: 'login', type: 'text', id: 'input_login'},
    inputPassword: {text: 'password', type: 'password', id: 'input_password'}  
  }}

  template() { 

    return  (
      `<PageColumn>
        <FormMain>
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
            ></ButtonSecondary>
          </BarFooter>
        </FormMain>
      </PageColumn>`
    )

  }

}  





const root = document.querySelector(".app")
const app = new App()
app.render(root)






