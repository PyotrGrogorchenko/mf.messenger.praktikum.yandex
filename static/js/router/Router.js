import Route from './Route.js';
function onRouteClick(e) {
    e.preventDefault();
    let attr = e.target.getAttribute('href');
    attr = attr ? attr : e.target.getAttribute('route');
    //console.log(attr?.slice(4))
    const router = new Router();
    router.go(`/${attr === null || attr === void 0 ? void 0 : attr.slice(4)}`);
}
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
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
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
export { Router, onRouteClick };
//# sourceMappingURL=Router.js.map