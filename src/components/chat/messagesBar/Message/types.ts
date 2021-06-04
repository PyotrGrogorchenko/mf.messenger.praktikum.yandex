import { Message } from '@socket'

export type Classes = {
  root: string
  content: string
  date: string
}

export type Props = {
  key: string
  message: Message
}
