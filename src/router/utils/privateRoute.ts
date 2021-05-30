import { selectAuth } from '@store'
import { Routes } from '../types'

export const privateRoute = (): boolean => {
  const privateRoutes: Routes[] = ['#chat', '#profile', '/']
  return !selectAuth() && privateRoutes.includes(<Routes>(window.location.hash || '/'))
}
