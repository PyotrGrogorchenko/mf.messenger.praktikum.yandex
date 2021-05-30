// // import { xhrGetAuthUser, xhrOnError } from '@xhr'
// import { Router } from './Router'

// export const defaultPage = (hash: string = '') => {
//   const router: Router = new Router()
//   router.renderPage('/')

//   console.log('hash', hash)
//   // if (hash === '') {
//   //   xhrGetAuthUser()
//   //     .then(
//   //       (req: XMLHttpRequest | undefined) => {
//   //         if (!req) {throw new Error('Something went wrong')}

//   //         if ((req as XMLHttpRequest).status === 401) {
//   //           window.location.hash = '#login'
//   //           return
//   //         } if ((req as XMLHttpRequest).status > 400) {throw new Error('Something went wrong')}

//   //         localStorage.setItem('id', req.response.id)
//   //         localStorage.setItem('first_name', req.response.first_name)
//   //         localStorage.setItem('second_name', req.response.second_name)
//   //         localStorage.setItem('login', req.response.login)
//   //         localStorage.setItem('email', req.response.email)
//   //         localStorage.setItem('phone', req.response.phone)

//   //         if (window.location.hash === '#chat') {
//   //           const router: Router = new Router()
//   //           router.renderPage(window.location.hash)
//   //         } else {
//   //           window.location.hash = '#chat'
//   //         }
//   //       },
//   //       (error: any) => {
//   //         xhrOnError(error)
//   //       }
//   //     )
//   // } else {
//   //   const router: Router = new Router()
//   //   router.renderPage(window.location.hash)
//   // }
// }
