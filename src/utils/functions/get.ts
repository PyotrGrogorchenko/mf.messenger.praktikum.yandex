export const get = (obj: any, path: string, defaultValue: any): any => {
  const keys: Array<string> = path.split('.')

  let result: any = obj
  for (const key of keys) {
    result = result[key]
    if (result === undefined) {
      return defaultValue
    }
  }

  if (result === null) {
    return null
  }

  return result ?? defaultValue
}
