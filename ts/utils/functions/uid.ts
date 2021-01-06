function uidCount(): () => number {
  let uidCount: number = -1
  return function(): number {
    uidCount++
    return uidCount
  }
}

export const uid = uidCount()