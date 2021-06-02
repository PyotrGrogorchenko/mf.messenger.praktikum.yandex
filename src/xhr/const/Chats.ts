import { UrlBase } from './UrlBase'

const { chats } = UrlBase

export class Chats {
  static create = `${chats}`
  static delete = `${chats}`
  static get = `${chats}`
  static addUsers = `${chats}/users`
  static token = `${chats}/token`
}
