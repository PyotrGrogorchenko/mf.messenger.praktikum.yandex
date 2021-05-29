import { User } from '../types'
import EventBus from './EventBus'

export class State {
  private static _instance: State
  private _eventBus: EventBus = new EventBus()
  private _user: User | null = null

  private constructor() {}

  public static getInstance(): State {
    if (!State._instance) {
      State._instance = new this()
    }
    return State._instance
  }

  get user() {return this._user}
  set user(value) {
    this._user = value
    State.getInstance()._eventBus.emit('FLOW_USER', this._user)
  }

  get eventBus() {return this._eventBus}
}
