export type Options = {
  headers?: LooseObject,
  withCredentials?: boolean
  timeout?: number
}

type ResponseBase = {
  status: number
  response: {
    error: string
    reason: string
  }
}

export type ResponseSignup = {
  response: {
    id: number
  }
} & ResponseBase

export type ResponseCommon = ResponseSignup

export type DataSignup = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type DataSignin = {
  login: string
  password: string
}

export type DataCommon = DataSignup | DataSignin
