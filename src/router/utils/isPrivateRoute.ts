import { selectAuth } from '@store'
import { Routes } from '../types'

export const isPrivateRoute = (hash: string = ''): boolean => {
  const privateRoutes: Routes[] = ['#chat', '#profile', '/']
  const hashTest = hash || window.location.hash || '/'

  return !selectAuth() && privateRoutes.includes(<Routes>(hashTest))
}
