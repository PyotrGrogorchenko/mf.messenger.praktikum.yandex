// function uidCount() {
//   let uidCount: number = -1
//   return function() {
//     uidCount++
//   return uidCount
//   }
// }

function uidCount(): () => number {
  let uidCount: number = -1
  return function(): number {
    uidCount++
    return uidCount
  }
}


const uid = uidCount()

export { uid }