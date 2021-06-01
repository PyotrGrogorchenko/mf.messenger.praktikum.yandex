export type Options = {
  headers?: LooseObject,
  withCredentials?: boolean
  timeout?: number
}

export type ResBase = {
  status: number
  response: {
    error: string
    reason: string
  }
}
