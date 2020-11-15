import { Router } from './Router.js'

import Login from '../components/pages/login.js'
import Signup from '../components/pages/signup.js'
import Index from '../index.js'
import SelectChat from '../components/pages/selectChat.js'
import Chat from '../components/pages/chat.js'
import UserSettings from '../components/pages/userSettings.js'
import Error404 from '../components/pages/error404.js'
import Error500 from '../components/pages/error500.js'

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