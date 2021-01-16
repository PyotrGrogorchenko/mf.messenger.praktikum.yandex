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
    renderPage(pathname) {
        this._onRoute(pathname);
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            console.error('Route not found:' + pathname);
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        this.history.pushState({}, pathname, pathname);
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