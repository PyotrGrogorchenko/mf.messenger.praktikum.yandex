import { initState } from '@store'
import './css/index.css'
import { startRouter } from './router'
// import { initDomEvents } from './DOMevents/index'
// import { defaultPage } from './router/utils'

initState()

// const startApp = () => {
//   defaultPage(window.location.hash)
// }

startRouter()
// initDomEvents()
// startApp()
