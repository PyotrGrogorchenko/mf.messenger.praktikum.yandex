import { inputIsValid } from './methods.js'

// type Indexed<T = number | string | boolean | undefined> = {
//   [key in string]: T | Indexed;
// }


function getFormData(): object {
  
  let valid = true
  let data: Array<Indexed> = []
  
  for (let form of document.forms) {
    for (let input of form.getElementsByTagName('input')) {
      
      const currInputIsValid:boolean = inputIsValid(input)
      valid = valid && currInputIsValid

      const type: string = input.getAttribute('type') as string

      data.push({ name: getInputName(input.id),
                  type,
                  value: input.value,
                  valid: currInputIsValid
              })
    }
  
  }
  
  return {valid, data}

}

function getInputName (id: string): string{
  return id.slice(6).replace('-', '_')
}

export { getFormData }