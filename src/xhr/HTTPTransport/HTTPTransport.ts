import { Methods } from './Methods'
import { Data, Options, Res } from '../types'

export class HTTPTransport {
  private static instance: HTTPTransport
  private constructor() {}

  public static getInstance(): HTTPTransport {
    if (!HTTPTransport.instance) {
      HTTPTransport.instance = new this()
    }
    return HTTPTransport.instance
  }

  get = <D extends Data>(url: string, data: D | null = null, options: Options = {}): Promise<Res> => this.request(url, Methods.GET, data, options)
  post = <D extends Data>(url: string, data: D, options: Options = {}): Promise<Res> => this.request(url, Methods.POST, data, options)
  // put = (url: string, options: Options, data: Data) => this.request(url, options, Methods.PUT, data)
  // delete = (url: string, options: Options, data: Data) => this.request(url, options, Methods.DELETE, data)

  request = (url: string, method: Methods, data: Data | null = null, options: Options): Promise<Res> => {
    const headers = options.headers || { 'content-type': 'application/json' }
    const timeout = options.timeout || 5000
    const withCredentials = options.withCredentials || true

    return new Promise<Res>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method as string, url)
      xhr.responseType = 'json'

      xhr.onload = () => {
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

      if (method === Methods.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
