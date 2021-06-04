import { selectUser } from '@store'
import { Classes, Props } from '../types'

export const getClasses = (props: Props): Classes => {
  const {
    message
  } = props

  const isOut = message.user_id === selectUser()?.id

  const root = ['message-root']
  root.push(`message-root_${isOut ? 'out' : 'in'}`)

  const content = ['message-content']
  content.push(`message-content_${isOut ? 'out' : 'in'}`)

  const date = ['message-date']
  date.push(`message-date_${isOut ? 'out' : 'in'}`)

  return {
    root: root.join(' '),
    content: content.join(' '),
    date: date.join(' ')
  }
}
