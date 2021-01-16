import { HTTPTransport } from '../xhr/HTTPTransport'
import { env } from '../const/index'
import Route from './Route'

class Router {

  static __instance: Router

  routes: Array<Route> = []
  history: History = window.history
  _currentRoute: Route | null = null
  _rootQuery: string = ''

  constructor(rootQuery: string = '') {
        if (Router.__instance) {
            return Router.__instance
        }

        this.routes = []
        this.history = window.history
        this._currentRoute = null
        this._rootQuery = rootQuery

        Router.__instance = this
    }

    use(pathname: string, block: any) {
        
      const route = new Route(pathname, block, {rootQuery: this._rootQuery})
      this.routes.push(route)
      return this     
      
    }

    start() {
      // На смену роута вызываем перерисовку
      window.addEventListener('popstate', ((event: any) => {
        this._onRoute(event.currentTarget.location.pathname)
      }).bind(this))

      return this 

    }

    renderPage(pathname:string) {
      this._onRoute(pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname)

        if (!route) {
          return;
        }

        if (this._currentRoute) {
          this._currentRoute.leave()
        }

        this._currentRoute = route
        
        route.render()
    }

    go(pathname: string) {
      this.history.pushState({}, '', pathname)
      this._onRoute(pathname)    
    }

    back() {
      this.history.back()
    }

    forward() {
      window.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname))
    }
}

export { Router }