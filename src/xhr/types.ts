import { User } from '@store'

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Options = {
  headers?: LooseObject,
  withCredentials?: boolean
  timeout?: number
}

type ResBase = {
  status: number
  response: {
    error: string
    reason: string
  }
}

export type ResSignup = {
  response: {
    id: number
  }
} & ResBase

export type ResUser = {
  response: User
} & ResBase

export type Res = ResSignup | ResUser

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

export type Data = DataSignup | DataSignin | null
