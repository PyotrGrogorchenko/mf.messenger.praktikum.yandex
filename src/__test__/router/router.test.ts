import '@testing-library/jest-dom/extend-expect'
// import { setUtils } from '../../utils/index'
// import { startRouter } from '../../router/index'
import { Router } from '../../router/Router'
// import { Route } from '../../router/Route'

function render() {

  // const div = document.createElement('div')
  // div.classList.add('app')

  // document.body.appendChild(div)

  // // Как подключить и выполнить скрипты??? \\

  // // const scriptTypes = document.createElement('script')
  // // scriptTypes.setAttribute('type','module')
  // // scriptTypes.setAttribute('src','../js/types/index.js')

  // // document.body.appendChild(scriptTypes)

  // // const scriptUtils = document.createElement('script')
  // // scriptUtils.setAttribute('type','module')
  // // scriptUtils.setAttribute('src','../js/utils/index.js')

  // // document.body.appendChild(scriptUtils)
  // // Как подключить и выполнить скрипты??? //

  // setUtils()

}

describe('router: router', () => {
  // beforeAll(() => {
  //   Route.mockImplementation(() => {
  //     return {
  //       render: () => {
  //         console.log('fake render')
  //       },
  //     }
  //   })
  // })

  const checkPage = (pageId: string) => {
    expect(window.location.pathname).toBe(`/${pageId}`)
  }

  // render()
  // startRouter()

  // console.log('startRouter')

  const router: Router = new Router()

  test('start', () => {checkPage('')})
  // test.skip('go login',        () => { router.go(`/login`);        checkPage('login') })
  // test.skip('go signup',       () => { router.go(`/signup`);       checkPage('signup') })
  // test.skip('go selectChat',   () => { router.go(`/selectChat`);   checkPage('selectChat') })
  // test.skip('go chat',         () => { router.go(`/chat`);         checkPage('chat') })
  // test.skip('go error404',     () => { router.go(`/error404`);     checkPage('error404') })
  // test.skip('go error500',     () => { router.go(`/error500`);     checkPage('error500') })
  // test.skip('go userSettings', () => { router.go(`/userSettings`); checkPage('userSettings') })

  test('go back', () => {router.back()})

  // /// ???
  // const onpopstate = jest.fn((event: any) => {
  //   router._onRoute(event.currentTarget.location.pathname)
  //   console.log('onpopstate')
  // })//.bind(router)

  // expect(onpopstate).toBeCalled()
})