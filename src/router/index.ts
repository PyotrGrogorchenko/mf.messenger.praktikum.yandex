import { Router } from './Router'

// import Login from '../components/pages/login/login'
// import Signup from '../components/pages/signup/signup'
import { Home } from '../components/pages/Home/index'
// import Chat from '../components/pages/chat/chat'
// import UserSettings from '../components/pages/userSettings/userSettings'
// import Error404 from '../components/pages/error404/error404'
// import Error500 from '../components/pages/error500/error500'
// import TestPage from '../components/pages/testPage/testPage'

function startRouter():void {
  const router: Router = new Router('.app')

  router
    .use('/', Home)
    // .use('#login', Login)
    // .use('#signup', Signup)
    // .use('#chat', Chat)
    // .use('#error404', Error404)
    // .use('#error500', Error500)
    // .use('#userSettings', UserSettings)
    // .use('#testPage', TestPage)
    .start()
}

export { startRouter }