export const get = (obj: any, path: string, defaultValue: any): any => {
  const keys: Array<string> = path.split('.')

  let result: any = obj
  for (let key of keys) {
    result = result[key]
    if (result === undefined ){
      //|| result === null) {
      return defaultValue;        
    }
  }

  if (result === null) {
    return null
  }

  return result ?? defaultValue // "??" — [оператор нуллевого слияния](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (не поддерживается старыми браузерами, для них нужен полифил)
}
