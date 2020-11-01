import Component from '../../component/component.js'
import PageColumn from '../page-column.js'
import UserSettingsBar from '../user-settings/user-settings-bar.js'
import BarHeader from '../auth-bar/bar__header.js'
import BarContent from '../auth-bar/bar__content.js'
import UserSettingsBarInput from '../user-settings/user-settings-bar-input.js'
import BarFooter from '../auth-bar/bar__footer.js'
import ButtonMain from '../UI/buttons/button-main.js'
import ButtonSecondary from '../UI/buttons/button-secondary.js'

class App extends Component {

  components() {return {PageColumn, UserSettingsBar, BarHeader, BarContent, UserSettingsBarInput, BarFooter, ButtonMain, ButtonSecondary}}
  
  template() { 

    return  (
      `<PageColumn>
        <UserSettingsBar>
          
          <BarHeader text='User settings'></BarHeader>
          
          <BarContent>
            <UserSettingsBarInput text='First name'       type='text'       id='input_first-name'     ></>                  
            <UserSettingsBarInput text='Second name'      type='text'       id='input_second-name'    ></>                  
            <UserSettingsBarInput text='Login'            type='text'       id='input_login'          ></>                  
            <UserSettingsBarInput text='Email'            type='email'      id='nput_emai'            ></>                  
            <UserSettingsBarInput text='Phone'            type='tel'        id='input_phone'          ></>                  
            <UserSettingsBarInput text='Old password'     type='password'   id='input_old-password'   ></>                  
            <UserSettingsBarInput text='New password'     type='password'   id='input_new-password'   ></>                  
          </BarContent>
          
          <BarFooter>
            <ButtonMain text='Save'  id='button_save'></ButtonMain>
          </BarFooter>
        
        </UserSettingsBar>
      </PageColumn>`
    )

  }

}  

const root = document.querySelector(".app")
const app = new App()
app.render(root)






