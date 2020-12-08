var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HTTPTransport } from '../xhr/HTTPTransport.js';
import { env } from '../const/index.js';
import Route from './Route.js';
class Router {
    constructor(rootQuery = '') {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = '';
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        // На смену роута вызываем перерисовку
        window.addEventListener('popstate', ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this));
        return this;
    }
    defaultPage() {
        return __awaiter(this, void 0, void 0, function* () {
            //this.go('/testPage')
            //this.go('/signup')
            const httpTransport = new HTTPTransport();
            const req = yield httpTransport.get(`${env.URL_REQUEST}/auth/user`, { withCredentials: true, headers: { 'content-type': 'application/json' } });
            if (req.status >= 400) {
                this.go('/login');
            }
            else {
                localStorage.setItem('first_name', req.response.first_name);
                localStorage.setItem('second_name', req.response.second_name);
                localStorage.setItem('login', req.response.login);
                localStorage.setItem('email', req.response.email);
                localStorage.setItem('phone', req.response.phone);
                this.go('/chat');
            }
        });
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        //console.log('route', route)
        if (!route) {
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        window.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
export { Router };
//# sourceMappingURL=Router.js.map