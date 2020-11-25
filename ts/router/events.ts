import { Router } from './Router'

function onRouteClick(e:Event) {
  e.preventDefault()
  
  let href : string | null = (e.target as HTMLElement).getAttribute('href')

  if (!href){
    console.error('Route not found')
    return
  }

  const router: Router = new Router()
  router.go(`/${href?.slice(4)}`)

}

// window.addEventListener("hashchange", function(e: Event) {
//   console.log('hashchange', e)
// }, false)

// window.addEventListener('popstate', function(e: Event) {
//   console.log('popstate', e)
// })

// window.addEventListener('beforeunload', function(e: Event) {
//   console.log('beforeunload', e)
// })

// window.addEventListener('unload', function(e: Event) {
//   console.log('unload', e)
// })

export { onRouteClick }