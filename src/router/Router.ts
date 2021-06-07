import { throwError } from '@store'
import { renderApp } from 'gpp-templator'
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

  _onRoute(pathname: Routes | null = null) {
    const route = pathname === null ? window.location.hash || '/' : pathname || '/'
    const Component = this._routes[route]

    if (!Component) {
      throwError(`Route not found:${route}`, 404)
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
