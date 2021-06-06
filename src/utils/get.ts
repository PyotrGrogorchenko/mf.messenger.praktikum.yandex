export const get = (obj: any, path: string, defaultValue: any = ''): any => {
  const keys: Array<string> = path.split('.')

  let result: any = obj
  keys.forEach(key => {
    result = result[key]
  })

  if (result === null) {
    return null
  }

  return result ?? defaultValue
}
