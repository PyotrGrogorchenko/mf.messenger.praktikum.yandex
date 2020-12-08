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
import Component from '../../../component/component.js';
import { env } from '../../../const/index.js';
import { HTTPTransport } from '../../../xhr/HTTPTransport.js';
import { Router } from '../../../router/Router.js';
//import { config as dotenv } from 'dotenv/config.js'
//import * as dotenv from "dotenv.js"
//require('dotenv')
//dotenv()
export default class Signup extends Component {
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
    //#Components
components() {return {PageColumn,AuthBarForm,Bar__Header,Bar__Content,AuthBarInput,Bar__Footer,ButtonMain,AnchorMain}}
//#Components
template() {
        return (`<PageColumn>
        <AuthBarForm>
          <Bar__Header text='Sign up'></Bar__Header>
          
          <Bar__Content>
            <AuthBarInput text='First name'   type='name'     id='input_first-name'   value={{state.first_name}} ></>                  
            <AuthBarInput text='Second name'  type='name'     id='input_second-name'  value={{state.second_name}} ></>                  
            <AuthBarInput text='Login'        type='login'    id='input_login'        value={{state.login}} ></>                  
            <AuthBarInput text='email'        type='mail'     id='input_email'        value={{state.email}} ></>                  
            <AuthBarInput text='Password'     type='password' id='input_password'     value={{state.password}} ></>                  
            <AuthBarInput text='Phone'        type='phone'    id='input_phone'        value={{state.phone}} ></>                  
          </Bar__Content>
          
          <Bar__Footer>
            <ButtonMain text='Sign up'      id='button-sign-up' onClick={{state.signUpOnClick}}></ButtonMain>
            <AnchorMain text='Log in'  id='button-to-log-in' href='#{R}login'></AnchorMain>
          </Bar__Footer>
        
        </AuthBarForm>
      </PageColumn>`);
    }
}
//# sourceMappingURL=signup.js.map