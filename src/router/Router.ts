import { renderApp } from '@Component'
import { Routes } from './types'

class Router {
  static __instance: Router
  private _routes: LooseObject = { }
  history: History = window.history

  private constructor() {}

  public static getInstance(): Router {
    if (!Router.__instance) {
      const instance = new this()
      Router.__instance = instance
    }
    return Router.__instance
  }

  use(pathname: Routes, Component: any) {
    this._routes[pathname] = Component
    return this
  }

  start() {
    window.addEventListener('hashchange', ((event: any) => {
      this._onRoute(event.currentTarget.location.hash)
    }))

    return this
  }

  renderPage() {
    this._onRoute()
  }

  _onRoute(pathname: Routes = '/') {
    const Component = this._routes[pathname || '/']

    if (!Component) {
      // eslint-disable-next-line no-console
      console.error(`Route not found:${pathname}`)
      return
    }

    renderApp(Component)
  }

  go(pathname: Routes) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }
}

export { Router }
