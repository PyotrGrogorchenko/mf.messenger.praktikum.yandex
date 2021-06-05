export class State {
  private static __instance: State
  private _RootComponent: any = null

  private constructor() {}

  public static getInstance(): State {
    if (!State.__instance) {
      State.__instance = new this()
    }
    return State.__instance
  }

  get RootComponent() {return this._RootComponent}
  set RootComponent(value) {
    this._RootComponent = value
  }
}
