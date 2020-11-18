
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect'
import Signup from '../../../../ts/components/pages/signup'


//function getExampleDOM() {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  // const div = document.createElement('div')
  // div.classList.add('app')
  // div.innerHTML = `
  //   <label for="username">Username</label>
  //   <input id="username" />
  //   <button>Print Username</button>
  // `
  // const button = div.querySelector('button')
  // const input = div.querySelector('input')
  // button.addEventListener('click', () => {
  //   // let's pretend this is making a server request, so it's async
  //   // (you'd want to mock this imaginary request in your unit tests)...
  //   setTimeout(() => {
  //     const printedUsernameContainer = document.createElement('div')
  //     printedUsernameContainer.innerHTML = `
  //       <div data-testid="printed-username">${input.value}</div>
  //     `
  //     div.appendChild(printedUsernameContainer)
  //   }, Math.floor(Math.random() * 200))
  // })
  //return div
//}

test('components => pages: signup', async () => {
  
  //getExampleDOM()
  
  const div = document.createElement('div')
  div.classList.add('app')

  const root: HTMLElement = document.querySelector('.app') as HTMLElement
  const app = new Signup()
  app.render(root)
  //window.createValidateEvents()
  
  const el: HTMLInputElement = getByTestId('input_first-name')

  expect(el.getAttribute('type')).toBe('text')
  
  //const famousWomanInHistory = 'Ada Lovelace'
  //const container = getExampleDOM()

  // // Get form elements by their label text.
  // // An error will be thrown if one cannot be found (accessibility FTW!)
  // const input = getByLabelText(container, 'Username')
  // input.value = famousWomanInHistory

  // // Get elements by their text, just like a real user does.
  // getByText(container, 'Print Username').click()

  // await waitFor(() =>
  //   expect(queryByTestId(container, 'printed-username')).toBeTruthy()
  // )

  // // getByTestId and queryByTestId are an escape hatch to get elements
  // // by a test id (could also attempt to get this element by its text)
  // expect(getByTestId(container, 'printed-username')).toHaveTextContent(
  //   famousWomanInHistory
  // )
  // // jest snapshots work great with regular DOM nodes!
  // expect(container).toMatchSnapshot()

})

