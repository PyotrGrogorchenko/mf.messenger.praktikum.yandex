import { Router } from '../Router'

export const goforward = () => {
  Router.getInstance().forward()
}
