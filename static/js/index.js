
const createListeners = () => {
  
  const form__main = document.getElementById('form__main')
  if (form__main) {form__main.addEventListener('submit', (e) => {consoleFilledInputs (e)})}
  
  const form__header = document.getElementById('form__header')
  if (form__header) {form__header.addEventListener('submit', (e) => {consoleFilledInputs (e)})}
  
  const form__footer = document.getElementById('form__footer')
  if (form__footer) {form__footer.addEventListener('submit', (e) => {consoleFilledInputs (e)})}
  
}

function consoleFilledInputs (e) {
  e.preventDefault()
  
  let res = {}
  for(let field of e.target) {
    if (field.tagName === "INPUT" && field.value){
      res[field.id] = field;
    }
  }
  console.log(res)

}

createListeners()