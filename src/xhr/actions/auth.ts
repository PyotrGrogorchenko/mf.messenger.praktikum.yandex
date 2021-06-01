import {
  DataSignin,
  DataSignup, ResLogout, ResSignin, ResSignup, ResUser
} from '../types'
import { HTTPTransport } from '../HTTPTransport'
import { Auth } from '../const'
import 'regenerator-runtime/runtime'

export const getUser = async (): Promise<ResUser> => {
  try {
    return await HTTPTransport.getInstance().exe<null, ResUser>('GET', Auth.user)
  } catch (err) {
    throw new Error(err)
  }
}

export const postSignup = async (data: DataSignup): Promise<ResSignup> => {
  try {
    return await HTTPTransport.getInstance().exe<DataSignup, ResSignup>('POST', Auth.signup, { data })
  } catch (err) {
    throw new Error(err)
  }
}

export const postSignin = async (data: DataSignin): Promise<ResSignin> => {
  try {
    return await HTTPTransport.getInstance().exe<DataSignin, ResSignin>('POST', Auth.signin, { data })
  } catch (err) {
    throw new Error(err)
  }
}

export const postLogout = async (): Promise<ResLogout> => {
  try {
    return await HTTPTransport.getInstance().exe<null, ResLogout>('POST', Auth.logout)
  } catch (err) {
    throw new Error(err)
  }
}
