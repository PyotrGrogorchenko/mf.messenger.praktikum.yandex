import { Router } from './Router'

import Login from '../components/pages/login'
import Signup from '../components/pages/signup'
import Index from '../components/pages/index'
import SelectChat from '../components/pages/selectChat'
import Chat from '../components/pages/chat'
import UserSettings from '../components/pages/userSettings'
import Error404 from '../components/pages/error404'
import Error500 from '../components/pages/error500'

function startRouter():void {

  const router: Router = new Router('.app')

  router
    .use('/', Index)
    .use('/login', Login)
    .use('/signup', Signup)
    .use('/selectChat', SelectChat)
    .use('/chat', Chat)
    .use('/error404', Error404)
    .use('/error500', Error500)
    .use('/userSettings', UserSettings)
    .start()

}

export { startRouter }