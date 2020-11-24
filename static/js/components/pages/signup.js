var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Component from '../../component/component.js.js.js.js.js';
import PageColumn from '../page-column.js.js.js.js.js';
import AuthBar from '../auth-bar/auth-bar/auth-bar.js.js.js.js.js';
import BarHeader from '../auth-bar/bar__header/bar__header.js.js.js.js.js';
import BarContent from '../auth-bar/bar__content/bar__content.js.js.js.js.js';
import AuthBarInput from '../auth-bar/auth-bar-input/auth-bar-input.js.js.js.js.js';
import BarFooter from '../auth-bar/bar__footer/bar__footer.js.js.js.js.js';
import ButtonMain from '../UI/buttons/button-main.js.js.js.js.js';
import AnchorMain from '../UI/anchors/anchor-main.js.js.js.js.js';
import { env } from '../../const/index.js.js.js.js.js';
import { HTTPTransport } from '../../xhr/HTTPTransport.js.js.js.js.js';
import { Router } from '../../router/Router.js.js.js.js.js';
//import { config as dotenv } from 'dotenv/config.js.js.js.js.js'
//import * as dotenv from "dotenv.js.js.js.js.js"
//require('dotenv')
//dotenv()
export default class Signup extends Component {
    components() { return { PageColumn, AuthBar, BarHeader, BarContent, AuthBarInput, BarFooter, ButtonMain, AnchorMain }; }
    signUpOnClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const formdata = window.getFormData();
            const body = {};
            for (const key in formdata.data) {
                body[formdata.data[key].name] = formdata.data[key].value;
            }
            console.log(body);
            let req;
            const httpTransport = new HTTPTransport();
            req = (yield httpTransport.post(`${env.URL_REQUEST}/auth/signup`, { data: body, withCredentials: true, headers: { 'content-type': 'application/json' } }));
            if (req) {
                if (req.status === 200) {
                    const router = new Router();
                    router.defaultPage();
                }
                else if (req.status >= 400) {
                    alert(`Failed to execute sign up. reason ${req.response.reason}`);
                }
                else {
                    alert(`Failed to execute sign up.`);
                }
            }
            else {
                alert(`Failed to execute sign up.`);
            }
        });
    }
    state() {
        return {
            signUpOnClick: this.signUpOnClick,
            first_name: !localStorage.getItem('first_name') ? '' : localStorage.getItem('first_name'),
            second_name: !localStorage.getItem('second_name') ? '' : localStorage.getItem('second_name'),
            login: !localStorage.getItem('login') ? '' : localStorage.getItem('login'),
            email: !localStorage.getItem('email') ? '' : localStorage.getItem('email'),
            phone: !localStorage.getItem('phone') ? '' : localStorage.getItem('phone'),
            password: ''
        };
    }
    template() {
        return (`<PageColumn>
        <AuthBar>
          <BarHeader text='Sign up'></BarHeader>
          
          <BarContent>
            <AuthBarInput text='First name'   type='name'     id='input_first-name'   value={{state.first_name}} ></>                  
            <AuthBarInput text='Second name'  type='name'     id='input_second-name'  value={{state.second_name}} ></>                  
            <AuthBarInput text='Login'        type='login'    id='input_login'        value={{state.login}} ></>                  
            <AuthBarInput text='email'        type='mail'     id='input_email'        value={{state.email}} ></>                  
            <AuthBarInput text='Password'     type='password' id='input_password'     value={{state.password}} ></>                  
            <AuthBarInput text='Phone'        type='phone'    id='input_phone'        value={{state.phone}} ></>                  
          </BarContent>
          
          <BarFooter>
            <ButtonMain text='Sign up'      id='button-sign-up' onClick={{state.signUpOnClick}}></ButtonMain>
            <AnchorMain text='Log in'  id='button-to-log-in' href='#{R}login'></AnchorMain>
          </BarFooter>
        
        </AuthBar>
      </PageColumn>`);
    }
}
//# sourceMappingURL=signup.js.map