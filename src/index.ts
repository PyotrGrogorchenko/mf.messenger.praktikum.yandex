import { startRouter } from './router/index'
import { setUtils } from './utils/index'
import { initDomEvents } from './DOMevents/index'
import { defaultPage } from './router/utils'

const startApp = () => {
  defaultPage(window.location.hash)
}

setUtils()
startRouter()
initDomEvents()
startApp()
