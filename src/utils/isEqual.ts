export const isEqual = (a: LooseObject, b: LooseObject): boolean => {
  if (a === null) {
    if (b !== null) {
      return false
    }
    return true
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  let res = true

  // eslint-disable-next-line no-restricted-syntax
  for (const key in a) {
    if (Object.prototype.hasOwnProperty.call(a, key)) {
      if (Array.isArray(a[key])) {
        if (!Array.isArray(b[key])) {return false}
        if (a[key].lenght !== b[key].lenght) {return false}

        for (let i = 0; i < a[key].lenght; i++) {
          res = isEqual(a[key][i], b[key][i])
          if (!res) return res
        }
      } if (typeof a[key] === 'object') {
        res = isEqual(a[key], b[key])
        if (!res) return res
      } else if (a[key] !== b[key]) {return false}
    }
  }

  return res
}
