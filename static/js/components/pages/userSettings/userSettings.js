//#Import
import ButtonSecondary from '../../../components/UI/buttons/button-secondary/button-secondary.js'
import ButtonMain from '../../../components/UI/buttons/button-main/button-main.js'
import Bar__Footer from '../../../components/auth-bar/bar__footer/bar__footer.js'
import UserSettingsBarInput from '../../../components/user-settings/user-settings-bar-input/user-settings-bar-input.js'
import Bar__Content from '../../../components/auth-bar/bar__content/bar__content.js'
import Bar__Header from '../../../components/auth-bar/bar__header/bar__header.js'
import UserSettingsBar from '../../../components/user-settings/user-settings-bar/user-settings-bar.js'
import PageColumn from '../../../components/page-column/page-column.js'
//#Import
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../../../component/Component.js';
import { defaultPage } from '../../../router/utils.js';
import { xhrPostLogout } from '../../../xhr/xhrExecute.js';
export default class UserSettings extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            logoutOnClick: this.logoutOnClick,
            first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
            second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
            login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
            email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
            phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
            oldPassword: '',
            newPassword: ''
        };
    }
    logoutOnClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let req = yield xhrPostLogout();
            console.log('xhrPostLogout', req);
            if (req) {
                if (req.status === 200) {
                    defaultPage();
                }
            }
            else {
                alert(`Failed to execute log out`);
            }
        });
    }
    //#Components
components() {return {PageColumn,UserSettingsBar,Bar__Header,Bar__Content,UserSettingsBarInput,Bar__Footer,ButtonMain,ButtonSecondary}}
//#Components
template() {
        return (`<PageColumn>
        <UserSettingsBar>
          
          <Bar__Header text='User settings'></Bar__Header>
          
          <Bar__Content>
            <UserSettingsBarInput text='First name'       type='text'       id='input_first-name'   value={{state.first_name}} ></>                  
            <UserSettingsBarInput text='Second name'      type='text'       id='input_second-name'  value={{state.second_name}}  ></>                  
            <UserSettingsBarInput text='Login'            type='text'       id='input_login'        value={{state.login}}  ></>                  
            <UserSettingsBarInput text='Email'            type='email'      id='input_email'        value={{state.email}}  ></>                  
            <UserSettingsBarInput text='Phone'            type='tel'        id='input_phone'        value={{state.phone}}  ></>                  
            <UserSettingsBarInput text='Old password'     type='password'   id='input_old-password' value={{state.oldPassword}}  ></>                  
            <UserSettingsBarInput text='New password'     type='password'   id='input_new-password' value={{state.newPassword}}  ></>                  
          </Bar__Content>
          
          <Bar__Footer>
            <ButtonMain text='Save' id='button_save'></ButtonMain>
            <ButtonSecondary text='Log out' id='button_log-out' onClick={{state.logoutOnClick}}></ButtonSecondary>
          </Bar__Footer>
        
        </UserSettingsBar>
      </PageColumn>`);
    }
}
//# sourceMappingURL=userSettings.js.map