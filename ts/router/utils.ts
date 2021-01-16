import { xhrGetAuthUser, xhrOnError } from "../xhr/xhrExecute"
import { Router } from "./Router"

export const defaultPage = (hash: string = '') => {

  if (hash === '') { 

    xhrGetAuthUser()
      .then(
        req => {

        if (!req) { throw 'Something went wrong' }

        if ((req as XMLHttpRequest).status === 401){
          window.location.hash = '#login'
          return
        } else if ((req as XMLHttpRequest).status > 400) { throw 'Something went wrong' }
      
        localStorage.setItem('first_name',    req.response.first_name)
        localStorage.setItem('second_name',   req.response.second_name)
        localStorage.setItem('login',         req.response.login)
        localStorage.setItem('email',         req.response.email)
        localStorage.setItem('phone',         req.response.phone)

        if (window.location.hash === '#chat') {
          const router: Router = new Router()
          router.renderPage(window.location.hash)
        } else {
          window.location.hash = '#chat'
        }
        
      },
      error => {
        xhrOnError(error)
      })
  } else {
    const router: Router = new Router()
    router.renderPage(window.location.hash)
  }

}
