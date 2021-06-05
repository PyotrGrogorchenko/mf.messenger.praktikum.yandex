import { Router } from '../Router'

export const goBack = () => {
  Router.getInstance().back()
}
