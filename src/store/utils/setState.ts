import { xhrUser } from '@xhr'

export const setState = async () => {
  const res = await xhrUser()
  console.log('status', res)
}
