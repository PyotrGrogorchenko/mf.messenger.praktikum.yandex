import { TestPage } from '@Components/pages/TestPage'
import { Login } from '@Components/pages/Login'
import { Signup } from '@Components/pages/Signup'
import { Error404 } from '@Components/pages/Error404'
import { Error500 } from '@Components/pages/Error500'
import { Profile } from '@Components/pages/Profile'
import { Chat } from '@Components/pages/Chat'
import { Router } from '../Router'
import { Routes } from '../Routes'

export const startRouter = () => {
  const router: Router = Router.getInstance()

  router
    .use(Routes.HOME, Profile)
    .use(Routes.LOGIN, Login)
    .use(Routes.TEST, TestPage)
    .use(Routes.SIGNUP, Signup)
    .use(Routes.CHAT, Chat)
    .use(Routes.ERROR404, Error404)
    .use(Routes.ERROR500, Error500)
    .use(Routes.PROFILE, Profile)
    .start()
}
