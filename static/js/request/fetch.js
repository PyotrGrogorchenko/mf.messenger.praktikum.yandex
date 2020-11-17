// const METHODS = {
//   GET: 'GET',
//   POST: 'POST',
//   PUT: 'PUT',
//   DELETE: 'DELETE'
// }
// type Indexed<T = number | string | undefined> = {
//   [key in string]: T | Indexed;
// }
var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["POST"] = "POST";
    METHODS["PUT"] = "PUT";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
// String.prototype.replaceAt = function(index, replacement) {
//   return this.substr(0, index) + replacement + this.substr(index + replacement.length);
// }
/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data) {
    if (!data) {
        return '';
    }
    let res = '';
    for (let [key, value] of Object.entries(data)) {
        res += `&${key}=${value}`;
    }
    if (res) {
        res = '?' + res.substr(1);
    }
    return res;
}
class HTTPTransport {
    constructor() {
        this.get = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
        };
        this.post = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }), options.timeout);
        };
        this.put = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }), options.timeout);
        };
        this.DELETE = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }), options.timeout);
        };
        // options:
        // headers — obj
        // data — obj
        this.request = (url, options, timeout = 5000) => {
            const { method, data, headers } = options;
            url += method === METHODS.GET ? queryStringify(data) : '';
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    if (xhr.status >= 400) {
                        throw Error(`Не удалось выполнить запрос, статус ${xhr.status}`);
                    }
                    resolve(xhr);
                };
                xhr.timeout = timeout;
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (headers) {
                    for (let [key, value] of Object.entries(headers)) {
                        xhr.setRequestHeader(key, value);
                    }
                }
                else {
                    xhr.setRequestHeader('content-type', 'application/json');
                }
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
    }
}
function fetchWithRetry(url, options) {
    if (!url || !options) {
        throw Error(`Не удалось выполнить запрос!`);
    }
    const retries = options.retries;
    for (let i = 0; i < retries; i++) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, false);
        xhr.send();
        if (xhr.status < 400) {
            return xhr.response;
        }
    }
    throw Error(`Не удалось выполнить запрос!`);
}
export { HTTPTransport };
// async function fetchWithRetry1(url: string, options: Indexed) {
//   const arrPromises = []
//   const retries: number = options.retries as number
//   for (let i = 1; i <= retries; i++) {
//     const httpTransport = new HTTPTransport()
//     arrPromises.push(httpTransport.get(url))
//   }
//   const res = await Promise.race(arrPromises).then(firstResult => {
//     return firstResult
//   })
//   return res
// }
//const requestURL = 'https://jsonplaceholder.typicode.com/users'
// const httpTransport = new HTTPTransport()
// httpTransport.get(requestURL, {data:{a: 1, b: 2}, headers: {'content-type': 'application/json'}})
//   .then(data => console.log('get', data))
//   .catch(err => console.log(err))
// httpTransport.post(requestURL, {data: {name:'Pyotr'}})
//   .then(data => console.log('post', data.response))
//   .catch(err => console.log(err))
//console.log(fetchWithRetry('', {retries: 5}))
// .then(data => console.log('get', data))
// .catch(err => console.log('err', err))
//# sourceMappingURL=fetch.js.map