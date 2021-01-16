import { xhrGetAuthUser, xhrOnError } from "../xhr/xhrExecute.js";
import { Router } from "./Router.js";
export const defaultPage = (pathname = '/') => {
    if (pathname === '/') {
        xhrGetAuthUser()
            .then(req => {
            if (!req) {
                throw 'Something went wrong';
            }
            if (req.status === 401) {
                window.location.replace(`${window.location.href}login`);
                return;
            }
            else if (req.status > 400) {
                throw 'Something went wrong';
            }
            localStorage.setItem('first_name', req.response.first_name);
            localStorage.setItem('second_name', req.response.second_name);
            localStorage.setItem('login', req.response.login);
            localStorage.setItem('email', req.response.email);
            localStorage.setItem('phone', req.response.phone);
            window.location.replace(`${window.location.href}chat`);
        }, error => {
            xhrOnError(error);
        });
    }
    else {
        const router = new Router();
        router.renderPage(window.location.pathname);
    }
};
//# sourceMappingURL=utils.js.map