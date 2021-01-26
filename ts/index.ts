import { startRouter } from './router/index'
import { setUtils } from './utils/index'
import { initDomEvents } from './DOMevents/index'
import { defaultPage } from './router/utils'

// let a
// let b = "jjj"
// //process.env.NODE_ENV

setUtils()
startRouter()
initDomEvents()
startApp()

function startApp() {
  defaultPage(window.location.hash)
}

