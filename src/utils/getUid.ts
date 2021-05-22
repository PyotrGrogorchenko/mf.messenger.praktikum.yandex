export const getUid = function (): () => number {
  let uidCount: number = 0
  return function (): number {
    uidCount++
    return uidCount
  }
}
