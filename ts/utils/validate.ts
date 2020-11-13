(function () { 

  for (let form of document.forms) {
    form.addEventListener('submit', (e) => {submit (e)})
    for (let input of form.getElementsByTagName('input')) {
      input.addEventListener('focus', (e) => {focus (e)})
      input.addEventListener('blur', (e) => {blur (e)})
    }
  }

  function submit (e: Event): void { 
    e.preventDefault() 

    //console.log('submit',  (e.target as HTMLInputElement).id)
    
    // let res = {} 
    // for(let field of e.target) { 
    //   if (field.tagName === "INPUT" && field.value){ 
    //     res[field.id] = field; 
    //   } 
    // } 
    // console.log(res) 
  
  } 

  function blur (e: Event): void { 
    e.preventDefault() 

    let input: HTMLInputElement = e.target as HTMLInputElement

    switch (input.type) {
      case 'text':
        break
      case 'email':
        console.log('email', validateEmail(input.value))
        break
      case 'tel':
        console.log('tel', validatePhone(input.value))
        break
      case 'password':
        break
      default:
        break
    }

  } 

  function focus (e: Event): void { 
    e.preventDefault() 

    //console.log('focus', (e.target as HTMLInputElement))
    
    // let res = {} 
    // for(let field of e.target) { 
    //   if (field.tagName === "INPUT" && field.value){ 
    //     res[field.id] = field; 
    //   } 
    // } 
    // console.log(res) 
  
  } 

  function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  function validatePhone(email: string) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return re.test(email)
  }

}) ()

