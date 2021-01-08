function uidCount(): () => number {
  let uidCount: number = 0
  return function(): number {
    uidCount++
    return uidCount
  }
}

export const uid = uidCount()