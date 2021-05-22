export const startsWithUpper = (str: string) => {
  const strTrim = str.trim()
  if (strTrim.length === 0) {
    return false
  }
  return strTrim[0] === strTrim[0].toUpperCase()
}
