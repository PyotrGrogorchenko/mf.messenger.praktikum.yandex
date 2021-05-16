export const queryStringify = (data: Indexed): string => {
  if (!data) {
    return ''
  }

  let res: string = ''
  for (const [key, value] of Object.entries(data)) {
    res += `&${key}=${value}`
  }
  if (res) {
    res = `?${res.substr(1)}`
  }
  return res
}
