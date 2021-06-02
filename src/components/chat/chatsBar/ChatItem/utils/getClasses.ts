import { Classes } from '../types'

export const getClasses = (mark: boolean = false): Classes => {
  const li = ['chats-list__chat-item']
  if (mark) {
    li.push('mark')
  }
  return {
    li: li.join(' ')
  }
}
