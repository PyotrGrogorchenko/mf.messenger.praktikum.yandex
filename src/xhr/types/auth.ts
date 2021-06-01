import { User } from '@store'
import { ResBase } from './common'

// Res
export type ResSignup = {
  response: {
    id: number
  }
} & ResBase

export type ResUser = {
  response: User
} & ResBase

export type ResSignin = ResBase

export type ResLogout = ResBase

export type ResAuth = ResSignup | ResUser | ResLogout | ResSignin

// Data
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

export type DataAuth = DataSignup | DataSignin | null
