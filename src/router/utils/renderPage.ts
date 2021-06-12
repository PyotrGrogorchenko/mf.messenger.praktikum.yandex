import { renderApp } from 'gpp-templator'
import { isPrivateRoute } from './isPrivateRoute'
import { redirect } from './redirect'

export const renderPage = (Component: any) => {
  if (isPrivateRoute()) {
    redirect('#signin')
  } else {
    renderApp(Component)
  }
}
