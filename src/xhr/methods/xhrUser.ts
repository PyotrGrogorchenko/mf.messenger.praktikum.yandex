import { ResUser } from '@xhrTypes'
import { HTTPTransport } from '../HTTPTransport'
import { Auth } from '../url'
import 'regenerator-runtime/runtime'

export const xhrUser = async (): Promise<ResUser> => {
  try {
    const httpTransport = HTTPTransport.getInstance()
    const res = await httpTransport.get(Auth.user) as ResUser
    return res
  } catch (error) {
    return error
  }
}
