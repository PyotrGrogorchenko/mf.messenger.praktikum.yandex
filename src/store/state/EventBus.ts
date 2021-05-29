import { Events } from './Events'

export default class EventBus {
  listeners: Record<string, Array<(...args: any[]) => void>> = {}

  on(event: Events, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = Array<() => void>()
    }

    this.listeners[event].push(callback)
  }

  off(event: Events, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Event is undefained: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit(event: Events, ...args:any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Event is undefained: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
