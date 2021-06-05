import { UrlBase } from './UrlBase'

const { user } = UrlBase

export class User {
  static search = `${user}/search`
  static profile = `${user}/profile`
}
