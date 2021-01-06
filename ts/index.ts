import { startRouter } from "./router/index"
import { setUtils } from "./utils/index"
import { initDomEvents } from "./DOMevents/index"

//import { HTTPTransport } from "./xhr/HTTPTransport"

setUtils()
startRouter()
initDomEvents()

//let req: XMLHttpRequest | null

// try {
//   const httpTransport = new HTTPTransport()
//   req = await httpTransport.get(`${env.URL_REQUEST}/auth/logout`, {withCredentials: true ,headers: {'content-type': 'application/json'}}) as XMLHttpRequest
// } catch (error) {
//   req = null
//   console.log('err', error)  
// }

// console.log(req)
