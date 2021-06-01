import { UrlBase } from './UrlBase'

const { auth } = UrlBase

export class Auth {
  static signup = `${auth}/signup`
  static signin = `${auth}/signin`
  static user = `${auth}/user`
  static logout = `${auth}/logout`
}
