import { reset as resetChats } from '@chatsController'
import { reset as resetStore } from '@store'
import { Router } from '../Router'
import { Routes } from '../types'

export const redirect = (route: Routes) => {
  resetStore()
  resetChats()
  Router.getInstance().go(route)
}
