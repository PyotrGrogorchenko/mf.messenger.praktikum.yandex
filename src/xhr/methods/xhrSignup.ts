import { HTTPTransport } from '../HTTPTransport'
import { Auth } from '../url'
import { DataSignup, ResSignup } from '../types'
import 'regenerator-runtime/runtime'

export const xhrSignup = async (data: DataSignup): Promise<ResSignup> => {
  try {
    const httpTransport = HTTPTransport.getInstance()
    const res = await httpTransport.post(Auth.signup, data) as ResSignup
    return res
  } catch (error) {
    return error
  }
}
