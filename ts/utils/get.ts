function get(obj: any, path: string, defaultValue: any): any {
  const keys: Array<any> = path.split('.')

  let result: any = obj
  for (let key of keys) {
    result = result[key]
    if (result === undefined || result === null) {
      return defaultValue;        
    }
  }

  return result ?? defaultValue // "??" — [оператор нуллевого слияния](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (не поддерживается старыми браузерами, для них нужен полифил)
}

export { get }