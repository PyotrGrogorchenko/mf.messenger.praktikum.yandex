import { ResBase } from './common'
import { User } from './user'

// signup
export type DataSignup = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type ResSignup = {
  response: {
    id: number
  }
} & ResBase

// signin
export type DataSignin = {
  login: string
  password: string
}

export type ResSignin = ResBase

// user
export type ResUserGet = {
  response: User
} & ResBase

// logout
export type ResLogout = ResBase

// common
export type DataAuth = DataSignup | DataSignin
export type ResAuth = ResSignup | ResUserGet | ResLogout | ResSignin
