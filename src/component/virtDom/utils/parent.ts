import { Node } from '../Node'

export const parent = (): (command: string, node: null | Node) => Node | null => {
  const parentsStack: Array<Node> = Array<Node>()
  return function (command: string = '', node: null | Node = null): Node | null {
    let res: Node | null = null
    if (command === 'remove') {
      parentsStack.pop()
    } else if (parentsStack.length > 0) {
      res = parentsStack[parentsStack.length - 1]
    }

    if (command === 'add') {
      parentsStack.push(node as Node)
    }

    return res
  }
}
