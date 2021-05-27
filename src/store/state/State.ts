import { User } from './types'

export class State {
  private static instance: State
  user: User | null = null
  private constructor() {}

  public static getInstance(): State {
    if (!State.instance) {
      State.instance = new this()
    }
    return State.instance
  }
}
