var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["POST"] = "POST";
    METHODS["PUT"] = "PUT";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
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
        // withCredentials — boolean
        this.request = (url, options, timeout = 5000) => {
            const { method, data, headers, withCredentials } = options;
            url += method === METHODS.GET ? window.queryStringify(data) : '';
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    //console.log(xhr)
                    // if (xhr.status >= 400){
                    //   throw Error (`Не удалось выполнить запрос, статус ${xhr.status}`)
                    // }
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
                if (withCredentials) {
                    xhr.withCredentials = withCredentials;
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
export { HTTPTransport };
//# sourceMappingURL=HTTPTransport.js.map