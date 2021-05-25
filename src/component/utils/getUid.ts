export const getUid = (function (): () => number {
  let uidCount: number = 0
  return (): number => {
    uidCount++
    return uidCount
  }
}())
