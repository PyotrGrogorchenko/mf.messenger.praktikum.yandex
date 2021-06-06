export const copyObj = (obj: any): any => {
  const res: any = {}

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'function') {
      res[key] = obj[key]
    } else if (Array.isArray(obj[key])) {
      res[key] = []
      obj[key].forEach((item: any) => {
        res[key].push(copyObj(item))
      })
    } else {
      res[key] = obj[key]
    }
  })

  return res
}
