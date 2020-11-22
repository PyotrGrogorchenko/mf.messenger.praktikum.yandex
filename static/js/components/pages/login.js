var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../../component/component.js';
import PageColumn from '../page-column.js';
import AuthBar from '../auth-bar/auth-bar.js';
import BarHeader from '../auth-bar/bar__header.js';
import BarContent from '../auth-bar/bar__content.js';
import AuthBarInput from '../auth-bar/auth-bar-input.js';
import BarFooter from '../auth-bar/bar__footer.js';
import ButtonMain from '../UI/buttons/button-main.js';
import AnchorMain from '../UI/anchors/anchor-main.js';
import { HTTPTransport } from '../../xhr/HTTPTransport.js';
import { env } from '../../const/index.js';
import { Router } from '../../router/Router.js';
export default class Login extends Component {
    components() { return { PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, AnchorMain }; }
    loginOnClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const formdata = window.getFormData();
            console.log(formdata);
            const body = {};
            for (const key in formdata.data) {
                body[formdata.data[key].name] = formdata.data[key].value;
            }
            //console.log(body)
            let req;
            try {
                const httpTransport = new HTTPTransport();
                req = (yield httpTransport.post(`${env.URL_REQUEST}/auth/signin`, { data: body, withCredentials: true, headers: { 'content-type': 'application/json' } }));
            }
            catch (error) {
                req = null;
                console.log('err', error);
            }
            if (req) {
                if (req.status === 200) {
                    const router = new Router();
                    router.defaultPage();
                }
                else if (req.status >= 400) {
                    alert(`Failed to execute sign in. reason ${req.response.reason}`);
                }
                else {
                    alert(`Failed to execute sign in.`);
                }
            }
        });
    }
    state() {
        return {
            loginOnClick: this.loginOnClick,
            login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
            password: ''
        };
    }
    template() {
        return (`<PageColumn>
        <AuthBar>
          <BarHeader text='Log in'></BarHeader>
          <BarContent>
            <AuthBarInput text='login'    type='text'     id='input_login'    value={{state.login}}></AuthBarInput>                  
            <AuthBarInput text='password' type='password' id='input_password' value={{state.password}}></AuthBarInput>                  
          </BarContent>
          <BarFooter>
            <ButtonMain text='Log in' id='button_log-in' onClick={{state.loginOnClick}}></ButtonMain>
            <AnchorMain text='Sign up' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
          </BarFooter>
        </AuthBar>
      </PageColumn>`);
    }
}
//# sourceMappingURL=login.js.map