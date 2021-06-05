import { Signin } from '@pages/Signin'
import { Signup } from '@pages/Signup'
import { Error } from '@pages/Error'
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
    .use('#error', Error)
    .use('#profile', Profile)
    .start()
}
