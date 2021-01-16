import { startRouter } from "./router/index"
import { setUtils } from "./utils/index"
import { initDomEvents } from "./DOMevents/index"
import { defaultPage } from "./router/utils"

setUtils()
startRouter()
initDomEvents()
startApp()

function startApp() {
  defaultPage(window.location.pathname)
}

