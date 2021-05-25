export default class EventBus {
  listeners: Record<string, Array<(...args: any[]) => void>> = {}

  on(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = Array<() => void>()
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit(event: string, ...args:any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
