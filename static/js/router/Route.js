class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = view;
        this._props = props;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        const root = document.querySelector(this._props.rootQuery);
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
    }
    match(pathname) {
        return pathname === this._pathname;
    }
    render() {
        const root = document.querySelector(this._props.rootQuery);
        const app = new this._blockClass();
        app.render(root);
    }
}
export default Route;
//# sourceMappingURL=Route.js.map