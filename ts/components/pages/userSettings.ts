import Component from '../../component/component'
import PageColumn from '../page-column'
import UserSettingsBar from '../user-settings/user-settings-bar'
import BarHeader from '../auth-bar/bar__header'
import BarContent from '../auth-bar/bar__content'
import UserSettingsBarInput from '../user-settings/user-settings-bar-input'
import BarFooter from '../auth-bar/bar__footer'
import ButtonMain from '../UI/buttons/button-main'
import ButtonSecondary from '../UI/buttons/button-secondary'
import PageId from '../pageId'

export default class UserSettings extends Component {

  components() {return {PageColumn, UserSettingsBar, BarHeader, BarContent, UserSettingsBarInput, BarFooter, ButtonMain, ButtonSecondary, PageId}}
  
  template() { 

    return  (
      `<PageId pageId='user-settings'></PageId>
      <PageColumn>
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