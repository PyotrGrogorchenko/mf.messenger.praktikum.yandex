import { Events } from './types'

export class EventBus<E extends Events> {
  private _listeners: Record<string, Array<(...args: any[]) => void>> = {}

  on(event: E, callback: () => void) {
    if (!this._listeners[event]) {
      this._listeners[event] = Array<() => void>()
    }

    this._listeners[event].push(callback)
  }

  off(event: E, callback: () => void) {
    if (!this._listeners[event]) return
    this._listeners[event] = this._listeners[event].filter(
      listener => listener !== callback
    )
  }

  offAll() {
    this._listeners = {}
  }

  emit(event: E, ...args:any[]) {
    if (!this._listeners[event]) return
    this._listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
