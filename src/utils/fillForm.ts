type Field = {
  name: string
  value: string
}

type Data = {
  [key: string]: Field
}

export const fillForm = (name: string, data: Data): void => {
  let form
  const { forms } = document
  for (let i = 0; i < forms.length; i++) {
    form = forms[i]
    const formName = forms[i].getAttribute('formName') || form.getAttribute('id') || String(i)
    if (formName === name) {
      form = forms[i]
      break
    }
  }

  if (!form) return

  const inputs = form.getElementsByTagName('input')
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    const { id } = input
    if (data[id]) {
      input.value = data[id].value
    }
  }
}
