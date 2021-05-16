function createValidateEvents() {
  for (const form of document.forms) {
    form.addEventListener('submit', (e) => {submit(e)})
    for (const input of form.getElementsByTagName('input')) {
      input.addEventListener('focus', (e) => {focus(e)})
      input.addEventListener('blur', (e) => {blur(e)})
    }
  }
}

function submit(e: Event): void {
  e.preventDefault()
}

function blur(e: Event): void {
  e.preventDefault()
}

function focus(e: Event): void {
  e.preventDefault()
}

export { createValidateEvents }
