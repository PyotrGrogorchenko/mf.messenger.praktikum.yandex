import { env } from '../const/index'
import { HTTPTransport } from './HTTPTransport'

export const xhrOnError = (error: any = null) => {
  // eslint-disable-next-line no-console
  console.error(`xhrExecute:${error}`)
}

export const xhrPostCreateChat = async (data:LooseObject) => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.post(`${env.URL_REQUEST}/chats`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' },
        data
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrGetChats = async () => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.get(`${env.URL_REQUEST}/chats`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' }
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrPostUsersSearh = async (searchString: string) => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.post(`${env.URL_REQUEST}/user/search`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' },
        data: { login: searchString }
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrGetAuthUser = async () => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.get(`${env.URL_REQUEST}/auth/user`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' }
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrPostAuthSignUp = async (data: LooseObject) => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.post(`${env.URL_REQUEST}/auth/signup`,
      {
        data,
        withCredentials: true,
        headers: { 'content-type': 'application/json' }
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrPostAuthSignin = async (data: LooseObject) => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.post(`${env.URL_REQUEST}/auth/signin`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' },
        data
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrPostLogout = async () => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.post(`${env.URL_REQUEST}/auth/logout`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' }
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrPostChatsToken = async (data: LooseObject) => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.post(`${env.URL_REQUEST}/chats/token/${data.id}`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' }
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrPutChatUsers = async (data:LooseObject) => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.put(`${env.URL_REQUEST}/chats/users`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' },
        data
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}

export const xhrGetChatsUsers = async (data:LooseObject) => {
  try {
    const httpTransport = new HTTPTransport()
    const req = await httpTransport.get(`${env.URL_REQUEST}/chats/${data.id}/users`,
      {
        withCredentials: true,
        headers: { 'content-type': 'application/json' }
      }) as XMLHttpRequest

    return req
  } catch (error) {
    xhrOnError(error)
  }
}
