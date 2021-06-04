export type MessageTypes = 'message' | 'user connected'

export type Message = {
  content: string
  id: number
  time: string
  type: MessageTypes
  user_id: number
}
