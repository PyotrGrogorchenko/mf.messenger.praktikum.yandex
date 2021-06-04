export const getTagName = (str: string): string => {
  const begin: number = 0
  const end: number = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ')
  return str.slice(begin, end)
}
