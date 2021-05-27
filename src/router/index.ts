// import { Home } from '@Components/pages/Home/index'
import { TestPage } from '@Components/pages/TestPage'
import { Login } from '@Components/pages/Login'
import { Signup } from '@Components/pages/Signup'
import { Error404 } from '@Components/pages/Error404'
import { Error500 } from '@Components/pages/Error500'
import { Profile } from '@Components/pages/Profile'
import { Chat } from '@Components/pages/Chat'
import { Router } from './Router'

// import Chat from '../components/pages/chat/chat'
// import UserSettings from '../components/pages/userSettings/userSettings'
// import Error404 from '../components/pages/error404/error404'
// import Error500 from '../components/pages/error500/error500'
// import TestPage from '../components/pages/testPage/testPage'

function startRouter():void {
  const router: Router = new Router('.app')

  router
    .use('/', Signup)
    .use('#login', Login)
    .use('#test', TestPage)
    .use('#signup', Signup)
    .use('#chat', Chat)
    .use('#error404', Error404)
    .use('#error500', Error500)
    .use('#profile', Profile)
    .use('/', TestPage)
    .start()
}

export { startRouter }
