import { Component } from '@Component'
import { rootQuery } from './const'

class Route {
  _pathname: string
  _blockClass: any
  _block: any

  constructor(pathname: string, view: Component) {
    this._pathname = pathname
    this._blockClass = view
    this._block = view
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    const root: HTMLElement = document.querySelector(rootQuery)
    if (root) {
      while (root.firstChild) {
        root.removeChild(root.firstChild)
      }
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    const root: HTMLElement | null = document.querySelector(rootQuery)
    if (root) {
      const app = new this._blockClass(root)
      app.init(root)
    }
  }
}

export default Route
