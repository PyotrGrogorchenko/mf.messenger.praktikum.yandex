"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor() {
        this.listeners = {};
    }
    // constructor() {
    //   this.listeners = {}
    // }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = Array();
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
// PP \\
exports.default = EventBus;
// PP //
//# sourceMappingURL=event-bus.js.map