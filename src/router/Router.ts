// import Route from './Route'

// import { Component } from '@Component'
import { renderApp } from '@Component'
import { Signup } from '@Components/pages/Signup'
// import { RoutesPath } from './RoutesPath'
import { Routes } from './types'

class Router {
  static __instance: Router
  private _routes: LooseObject = { }

  _block = Signup

  // routes: Routes = {}
  history: History = window.history
  // private _currentRoute: Route | null = null

  private constructor() {}

  public static getInstance(): Router {
    if (!Router.__instance) {
      const instance = new this()
      // instance._routes = []
      // instance.history = window.history
      // instance._currentRoute = null
      Router.__instance = instance
    }
    return Router.__instance
  }

  // constructor(rootQuery: string = '') {
  //   if (Router.__instance) {
  //     return Router.__instance
  //   }

  //   this.routes = []
  //   this.history = window.history
  //   this._currentRoute = null

  //   Router.__instance = this
  // }

  use(pathname: Routes, Component: any) {
    // const route = new Route(pathname, block)
    this._routes[pathname] = Component
    return this
  }

  start() {
    // На смену роута вызываем перерисовку
    window.addEventListener('popstate', ((event: any) => {
      this._onRoute(event.currentTarget.location.pathname)
    }))

    return this
  }

  renderPage() {
    this._onRoute()
  }

  _onRoute(pathname: Routes = <Routes>window.location.hash || '/') {
    const Component = this._routes[pathname]

    if (!Component) {
      // eslint-disable-next-line no-console
      console.error(`Route not found:${pathname}`)
      return
    }

    renderApp(Component)
  }

  // _onRoute(pathname: string) {
  //   const route = this.getRoute(pathname)

  //   if (!route) {
  //     // eslint-disable-next-line no-console
  //     console.error(`Route not found:${pathname}`)
  //     return
  //   }

  //   if (this._currentRoute) {
  //     this._currentRoute.leave()
  //   }

  //   this._currentRoute = route

  //   route.render()
  // }

  go(pathname: Routes) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  // back() {
  //   this.history.back()
  // }

  // forward() {
  //   this.history.forward()
  // }

  // getRoute(pathname: string) {
  //   return this.routes.find(route => route.match(pathname))
  // }
}

export { Router }
