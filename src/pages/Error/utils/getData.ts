import { selectErr } from '@store'

export const getData = () => {
  const res = {
    status: 404,
    reason: 'Something went wrong'
  }
  const err = selectErr()
  if (err) {
    res.reason = err.message
  }
  return res
}
