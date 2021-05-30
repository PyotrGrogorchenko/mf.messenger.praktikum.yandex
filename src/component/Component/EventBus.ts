import { Events } from './Events'

export default class EventBus {
  private _listeners: Record<string, Array<(...args: any[]) => void>> = {}

  on(event: Events, callback: () => void) {
    if (!this._listeners[event]) {
      this._listeners[event] = Array<() => void>()
    }

    this._listeners[event].push(callback)
  }

  off(event: Events, callback: () => void) {
    if (!this._listeners[event]) {
      throw new Error(`Event is undefained: ${event}`)
    }

    this._listeners[event] = this._listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit(event: Events, ...args:any[]) {
    if (!this._listeners[event]) {
      throw new Error(`Event is undefained: ${event}`)
    }

    this._listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
