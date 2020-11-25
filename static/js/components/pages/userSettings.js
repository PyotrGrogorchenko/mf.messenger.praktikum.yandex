var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../../component/component.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import PageColumn from '../page-column.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import UserSettingsBar from '../user-settings/user-settings-bar.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import BarHeader from '../auth-bar/bar__header/bar__header.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import BarContent from '../auth-bar/bar__content/bar__content.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import UserSettingsBarInput from '../user-settings/user-settings-bar-input.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import BarFooter from '../auth-bar/bar__footer/bar__footer.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import ButtonMain from '../UI/buttons/button-main.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import ButtonSecondary from '../UI/buttons/button-secondary.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { HTTPTransport } from '../../xhr/HTTPTransport.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { env } from '../../const/index.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
import { Router } from '../../router/Router.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
export default class UserSettings extends Component {
    components() { return { PageColumn, UserSettingsBar, BarHeader, BarContent, UserSettingsBarInput, BarFooter, ButtonMain, ButtonSecondary }; }
    // componentDidMount() {
    //   console.
    // }
    logoutOnClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let req;
            try {
                const httpTransport = new HTTPTransport();
                req = (yield httpTransport.post(`${env.URL_REQUEST}/auth/logout`, { withCredentials: true, headers: { 'content-type': 'application/json' } }));
            }
            catch (error) {
                req = null;
            }
            if (req) {
                if (req.status === 200) {
                    const router = new Router();
                    router.defaultPage();
                }
            }
            else {
                alert(`Failed to execute log out`);
            }
        });
    }
    state() {
        return {
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
    template() {
        return (`<PageColumn>
        <UserSettingsBar>
          
          <BarHeader text='User settings'></BarHeader>
          
          <BarContent>
            <UserSettingsBarInput text='First name'       type='text'       id='input_first-name'   value={{state.first_name}} ></>                  
            <UserSettingsBarInput text='Second name'      type='text'       id='input_second-name'  value={{state.second_name}}  ></>                  
            <UserSettingsBarInput text='Login'            type='text'       id='input_login'        value={{state.login}}  ></>                  
            <UserSettingsBarInput text='Email'            type='email'      id='input_email'        value={{state.email}}  ></>                  
            <UserSettingsBarInput text='Phone'            type='tel'        id='input_phone'        value={{state.phone}}  ></>                  
            <UserSettingsBarInput text='Old password'     type='password'   id='input_old-password' value={{state.oldPassword}}  ></>                  
            <UserSettingsBarInput text='New password'     type='password'   id='input_new-password' value={{state.newPassword}}  ></>                  
          </BarContent>
          
          <BarFooter>
            <ButtonMain text='Save' id='button_save'></ButtonMain>
            <ButtonSecondary text='Log out' id='button_log-out' onClick={{state.logoutOnClick}}></ButtonSecondary>
          </BarFooter>
        
        </UserSettingsBar>
      </PageColumn>`);
    }
}
//# sourceMappingURL=userSettings.js.map