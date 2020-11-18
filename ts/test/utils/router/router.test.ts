
import '@testing-library/jest-dom/extend-expect'
import { setUtils } from '../../../utils/index'
import { startRouter } from '../../../router/index'
import { Router } from '../../../router/Router'

function render() {
  
  const div = document.createElement('div')
  div.classList.add('app')
    
  document.body.appendChild(div)
  
  // Как подключить и выполнить скрипты??? \\  

  // const scriptTypes = document.createElement('script')
  // scriptTypes.setAttribute('type','module')
  // scriptTypes.setAttribute('src','../js/types/index.js')
  
  // document.body.appendChild(scriptTypes)

  // const scriptUtils = document.createElement('script')
  // scriptUtils.setAttribute('type','module')
  // scriptUtils.setAttribute('src','../js/utils/index.js')
  
  // document.body.appendChild(scriptUtils)
  // Как подключить и выполнить скрипты??? //

  setUtils()

}

describe('router: router', () => {

  const checkPage = (pageId: string) => {
    const div = document.getElementById('page-id')
    expect(div).not.toBe(null)
    expect(div.getAttribute('pageId')).toBe(pageId)
  }

  render()
  startRouter()

  const router: Router = new Router()

  test('start',           () => { checkPage('index') })
  test('go login',        () => { router.go(`/login`);        checkPage('login') })
  test('go signup',       () => { router.go(`/signup`);       checkPage('signup') })
  test('go selectChat',   () => { router.go(`/selectChat`);   checkPage('select-chat') })
  test('go chat',         () => { router.go(`/chat`);         checkPage('chat') })
  test('go error404',     () => { router.go(`/error404`);     checkPage('error404') })
  test('go error500',     () => { router.go(`/error500`);     checkPage('error500') })
  test('go userSettings', () => { router.go(`/userSettings`); checkPage('user-settings') })

  // ??? Как тетировать ??? 
  // window.onpopstate
  // Expected: "error500"
  // Received: "user-settings"
  test('back userSettings => error500', () => { router.back(); checkPage('error500') })


})

