
//import '../../router/node_modules/@testing-library/jest-dom/extend-expect'
import Signup from '../../components/pages/signup'
import { setUtils } from '../../utils/index'

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

  const root: HTMLElement = document.querySelector('.app') as HTMLElement
  const app = new Signup()
  app.render(root)

}

describe('components => pages: signup', () => {

  render()

  const checkInput = (id: string, type: string, textContent: string) => {
    
    const input = document.getElementById(id)
    expect(input).not.toBe(null)
    expect(input.getAttribute('type')).toBe(type)

    let label = document.querySelector(`[for="${id}"]`)
    expect(label).not.toBe(null)
    expect(label.textContent).toBe(textContent)

  }
 
  test('id=input_first-name',   () => { checkInput('input_first-name',  'name',     'First name') })
  test('id=input_second-name',  () => { checkInput('input_second-name', 'name',     'Second name') })
  test('id=input_login',        () => { checkInput('input_login',       'login',    'Login') })
  test('id=input_email',        () => { checkInput('input_email',       'mail',     'email') })
  test('id=input_password',     () => { checkInput('input_password',    'password', 'Password') })
  test('id=input_phone',        () => { checkInput('input_phone',       'phone',    'Phone') })
 
})

