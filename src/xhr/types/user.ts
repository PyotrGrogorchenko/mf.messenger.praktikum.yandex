// import { User } from '@store'
import { ResBase } from './common'

export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

// user search
export type DataUserSearch = {
  login: string
}

export type ResUserSearch = {
  response: User[]
} & ResBase

// common
export type DataUser = DataUserSearch
export type ResUser = ResUserSearch
