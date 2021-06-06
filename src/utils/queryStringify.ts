export const queryStringify = (data: LooseObject): string => {
  if (!data) return ''
  let res: string = ''
  Object.keys(data).forEach(key => {
    res += `&${key}=${data[key]}`
  })
  if (res) res = `?${res.substr(1)}`
  return res
}
