// import { Router } from './Router'
// import { defaultPage } from './utils'

// function onRouteClick(e:MouseEvent) {
//   e.preventDefault()
//   e.stopPropagation()

//   let href : string | null = null
//   for (let i = 0; i < e.path.length; i++) {
//     const el = e.path[i]
//     href = el.getAttribute('href')
//     if (href && href.startsWith('#{R}')) {
//       break
//     }
//   }

//   if (!href) {
//     console.error('Route not found')
//     return
//   }

//   const router: Router = new Router()
//   router.go(`${href?.slice(4)}`)
// }

// window.addEventListener('hashchange', (e: Event) => {
//   if (window.location.hash === '') {
//     window.history.back()
//   } else {
//     const router: Router = new Router()
//     router.renderPage(window.location.hash)
//   }
// }, false)

// export { onRouteClick }
