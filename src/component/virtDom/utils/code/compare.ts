export const compare = (left: number, sign: string, right: number): boolean => {
  switch (sign) {
    case '<': return left < right
    case '<=': return left <= right
    case '>': return left > right
    case '>=': return left >= right
    case '===': return left === right
    case '!==': return left !== right
    default:
      throw new Error('Compare error')
  }
}
