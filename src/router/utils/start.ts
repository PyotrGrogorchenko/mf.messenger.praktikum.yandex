import { Signin } from '@Components/pages/Signin'
import { Signup } from '@Components/pages/Signup'
import { Error404 } from '@Components/pages/Error404'
import { Error500 } from '@Components/pages/Error500'
import { Profile } from '@Components/pages/Profile'
import { Chat } from '@Components/pages/Chat'
import { Home } from '@Components/pages/Home'
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
