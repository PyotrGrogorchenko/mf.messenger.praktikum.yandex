export class Chat {
  static __instance: Chat

  private constructor() {}

  public static getInstance(): Chat {
    if (!Chat.__instance) {
      const instance = new this()
      Chat.__instance = instance
    }
    return Chat.__instance
  }
}
