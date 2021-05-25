import { parserNoREGEXP } from './parsers'
import { Node } from './types'

function parser(str:string): Array<Node> {
  return parserNoREGEXP(str)
}

export { parser }
