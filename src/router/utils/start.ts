import { Signin } from '@pages/Signin'
import { Signup } from '@pages/Signup'
import { Error404 } from '@pages/Error404'
import { Error500 } from '@pages/Error500'
import { Profile } from '@pages/Profile'
import { Chat } from '@pages/Chat'
import { Home } from '@pages/Home'
import { Router } from '../Router'

export const start = () => {
  const router: Router = Router.getInstance()

  router
    .use('/', Chat)
    .use('#signin', Signin)
    .use('#test', Home)
    .use('#signup', Signup)
    .use('#chat', Chat)
    .use('#error404', Error404)
    .use('#error500', Error500)
    .use('#profile', Profile)
    .start()
}
