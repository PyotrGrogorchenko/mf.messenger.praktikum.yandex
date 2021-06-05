import { reset } from '@chatsController'
import { clearSubscribes } from '@store'
import { Router } from '../Router'
import { Routes } from '../types'

export const redirect = (route: Routes) => {
  clearSubscribes()
  reset()
  Router.getInstance().go(route)
}
