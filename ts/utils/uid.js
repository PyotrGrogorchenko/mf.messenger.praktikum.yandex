function uidCount() {
    let uidCount = -1
    return function() {
      uidCount++
    return uidCount
    }
  }
  
  const uid = uidCount()
  
  export default uid