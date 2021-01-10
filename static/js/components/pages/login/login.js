//#Import
import AnchorMain from '../../../components/UI/anchors/anchor-main/anchor-main.js'
import ButtonMain from '../../../components/UI/buttons/button-main/button-main.js'
import Bar__Footer from '../../../components/auth-bar/bar__footer/bar__footer.js'
import AuthBarInput from '../../../components/auth-bar/auth-bar-input/auth-bar-input.js'
import Bar__Content from '../../../components/auth-bar/bar__content/bar__content.js'
import Bar__Header from '../../../components/auth-bar/bar__header/bar__header.js'
import AuthBarForm from '../../../components/auth-bar/auth-bar-form/auth-bar-form.js'
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
import { HTTPTransport } from '../../../xhr/HTTPTransport.js';
import { env } from '../../../const/index.js';
import { Router } from '../../../router/Router.js';
export default class Login extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            loginOnClick: this.loginOnClick,
            login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
            password: ''
        };
    }
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
    //#Components
components() {return {PageColumn,AuthBarForm,Bar__Header,Bar__Content,AuthBarInput,Bar__Footer,ButtonMain,AnchorMain}}
//#Components
template() {
        return (`<PageColumn>
        <AuthBarForm>
          <Bar__Header text='Log in'></Bar__Header>
          <Bar__Content>
            <AuthBarInput text='login'    type='text'     id='input_login'    value={{state.login}}></AuthBarInput>                  
            <AuthBarInput text='password' type='password' id='input_password' value={{state.password}}></AuthBarInput>                  
          </Bar__Content>
          <Bar__Footer>
            <ButtonMain text='Log in' id='button_log-in' onClick={{state.loginOnClick}}></ButtonMain>
            <AnchorMain text='Sign up' id='button_to-sign-up' href='#{R}signup'></AnchorMain>
          </Bar__Footer>
        </AuthBarForm>
      </PageColumn>`);
    }
}
//# sourceMappingURL=login.js.map