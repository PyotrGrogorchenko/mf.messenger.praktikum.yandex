import { PARSER_TYPES } from './PARSER_TYPES'

export type Node = {
  type: PARSER_TYPES,
  content: string,
  uid: number,
  deleteMark: boolean
}
