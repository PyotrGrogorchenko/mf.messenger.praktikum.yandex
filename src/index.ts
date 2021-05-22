import { startRouter } from './router/index'
import { initDomEvents } from './DOMevents/index'
import { defaultPage } from './router/utils'

const startApp = () => {
  defaultPage(window.location.hash)
}

startRouter()
initDomEvents()
startApp()
