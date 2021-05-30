import { User } from '../types'
import { EventBus } from './EventBus'
import { Events } from './Events'

export class State {
  private static __instance: State
  private _eventBus: EventBus = new EventBus()
  private _user: User | null = null

  private constructor() {}

  public static getInstance(): State {
    if (!State.__instance) {
      State.__instance = new this()
    }
    return State.__instance
  }

  get user() {return this._user}
  set user(value) {
    this._user = value
    State.getInstance()._eventBus.emit('FLOW_USER', this._user)
  }

  subscribe(event: Events, cb: any) {
    this._eventBus.on(event, cb)
  }

  clearSubscribes() {
    this._eventBus.offAll()
  }
}
