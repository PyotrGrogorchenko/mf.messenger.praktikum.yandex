import Component from '../../component/component.js';
import PageColumn from '../page-column.js';
import AuthBar from '../auth-bar/auth-bar.js';
import BarHeader from '../auth-bar/bar__header.js';
import BarContent from '../auth-bar/bar__content.js';
import AuthBarInput from '../auth-bar/auth-bar-input.js';
import BarFooter from '../auth-bar/bar__footer.js';
import ButtonMain from '../UI/buttons/button-main.js';
import ButtonSecondary from '../UI/buttons/button-secondary.js';
export default class Signup extends Component {
    components() { return { PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, ButtonSecondary }; }
    template() {
        return (`<PageColumn>
        <AuthBar>
          <BarHeader text='Sign up'></BarHeader>
          
          <BarContent>
            <AuthBarInput text='First name'   type='chat-name'  id='input_first-name'   ></>                  
            <AuthBarInput text='Second name'  type='chat-name'  id='input_second-name'  ></>                  
            <AuthBarInput text='Login'        type='text'       id='input_login'        ></>                  
            <AuthBarInput text='Email'        type='email'      id='input_email'        ></>                  
            <AuthBarInput text='Password'     type='password'   id='input_password'     ></>                  
            <AuthBarInput text='Phone'        type='tel'        id='input_phone'        ></>                  
          </BarContent>
          
          <BarFooter>
            <ButtonMain text='Sign up'      id='button-sign-up'></ButtonMain>
            <ButtonSecondary text='Log in'  id='button-to-log-in' href='#{R}login'></ButtonSecondary>
          </BarFooter>
        
        </AuthBar>
      </PageColumn>`);
    }
}
// const root: HTMLElement | null = document.querySelector(".app")
// const app: App = new App()
// app.render(root)
//# sourceMappingURL=signup.js.map