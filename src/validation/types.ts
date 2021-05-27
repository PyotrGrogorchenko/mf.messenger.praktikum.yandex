export enum ValidTypes {
  text = 'text',
  name = 'name',
  phone = 'phone',
  password = 'password',
  email = 'email'
}

export type Patterns = {
  [key in ValidTypes]: RegExp
}
