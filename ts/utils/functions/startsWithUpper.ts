export const startsWithUpper = (str: string) => {
  str = str.trim()
  if (str.length === 0){
    return false
  }
  return str[0] === str[0].toUpperCase()
}