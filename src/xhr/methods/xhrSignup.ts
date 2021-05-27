import { HTTPTransport } from '../HTTPTransport'
import { Auth } from '../url'
import { DataSignup, ResponseSignup } from '../types'
import 'regenerator-runtime/runtime'

export const xhrSignup = async (data: DataSignup): Promise<ResponseSignup> => {
  try {
    const httpTransport = HTTPTransport.getInstance()
    const res = await httpTransport.post(Auth.signup, data) as ResponseSignup
    return res
  } catch (error) {
    return error
  }
}
