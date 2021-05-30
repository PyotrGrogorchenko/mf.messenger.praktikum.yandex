import { clearEvents } from '@store'
import { Router } from '../Router'
import { Routes } from '../types'

export const redirect = (route: Routes) => {
  clearEvents()
  Router.getInstance().go(route)
}
