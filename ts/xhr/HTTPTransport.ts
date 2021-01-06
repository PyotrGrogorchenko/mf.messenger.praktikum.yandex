enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export class HTTPTransport {
  
  get = (url: string, options: Indexed = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout as number);
  }

  post = (url: string, options: Indexed = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout as number);
  }

  put = (url: string, options: Indexed = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout as number);
  }

  DELETE = (url: string, options: Indexed = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout as number);
  }

  // options:
  // headers — obj
  // data — obj
  // withCredentials — boolean
  request = (url: string, options: Indexed, timeout: number = 5000) => {
    const {method, data, headers, withCredentials} = options

    url += method === METHODS.GET ? window.queryStringify(data as Indexed) : ''

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method as string, url)
      xhr.responseType = 'json'
      
      xhr.onload = function() {
        //console.log(xhr)
        // if (xhr.status >= 400){
        //   throw Error (`Не удалось выполнить запрос, статус ${xhr.status}`)
        // }
        resolve(xhr)
      }
      
      xhr.timeout = timeout
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (headers) {
        for (let [key, value] of Object.entries(headers)){
          xhr.setRequestHeader(key, value as string)
        }
      } else {
        xhr.setRequestHeader('content-type', 'application/json')  
      }

      if (withCredentials){
        xhr.withCredentials = withCredentials as boolean
      }

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })

  }
}