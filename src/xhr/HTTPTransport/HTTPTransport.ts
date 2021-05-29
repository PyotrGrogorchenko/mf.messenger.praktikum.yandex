import {
  Data, Options, Res, Methods
} from '../types'

export class HTTPTransport {
  private static instance: HTTPTransport
  private constructor() {}

  public static getInstance(): HTTPTransport {
    if (!HTTPTransport.instance) {
      HTTPTransport.instance = new this()
    }
    return HTTPTransport.instance
  }

  exe = <D extends Data, R extends Res>
  (
    method: Methods,
    url: string,
    optional: {
      data?: D,
      options?: Options
    } = {}
  ): Promise<R> => this.request(url, method, optional)

  request = <R extends Res>(url: string, method: Methods, optional: { data?: Data, options?: Options }): Promise<R> => {
    const { options, data } = optional
    const headers = (options && options.headers) || { 'content-type': 'application/json' }
    const timeout = (options && options.timeout) || 5000
    const withCredentials = (options && options.withCredentials) || true

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.responseType = 'json'

      xhr.onload = () => {
        // @ts-ignore
        resolve(xhr)
      }

      xhr.timeout = timeout
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, String(headers[key]))
        })
      } else {
        xhr.setRequestHeader('content-type', 'application/json')
      }

      xhr.withCredentials = withCredentials

      if (method === 'GET' || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
