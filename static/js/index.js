import { startRouter } from "./router/index.js";
import { setUtils } from "./utils/index.js";
import { makeDomEvents } from "./DOMevents/index.js";
//import { HTTPTransport } from "./xhr/HTTPTransport.js"
setUtils();
startRouter();
makeDomEvents();
//let req: XMLHttpRequest | null
// try {
//   const httpTransport = new HTTPTransport()
//   req = await httpTransport.get(`${env.URL_REQUEST}/auth/logout`, {withCredentials: true ,headers: {'content-type': 'application/json'}}) as XMLHttpRequest
// } catch (error) {
//   req = null
//   console.log('err', error)  
// }
// console.log(req)
//# sourceMappingURL=index.js.map