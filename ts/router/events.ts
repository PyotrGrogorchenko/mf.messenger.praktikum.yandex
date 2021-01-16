import { Router } from './Router'

function onRouteClick(e:MouseEvent) {
  e.preventDefault()
  e.stopPropagation()

  let href : string | null = null
  for (let i = 0; i < e.path.length; i++) {
    const el = e.path[i]
    href = el.getAttribute('href')
    if (href && href.startsWith('#{R}')) {
      break
    }
  }

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