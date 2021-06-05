// import { User } from '@store'
import { ResBase } from './common'

export type UserData = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

type UserId = {
  id: number
}

export type User = UserId & UserData

// user search
export type DataUserSearch = {
  login: string
}

export type ResUserSearch = {
  response: User[]
} & ResBase

// user profile
export type DataUserProfile = UserData

export type ResUserProfile = {
  response: User
} & ResBase

// common
export type DataUser = DataUserSearch | DataUserProfile
export type ResUser = ResUserSearch | ResUserProfile
