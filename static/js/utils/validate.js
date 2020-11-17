function createValidateEvents() {
    for (let form of document.forms) {
        form.addEventListener('submit', (e) => { submit(e); });
        for (let input of form.getElementsByTagName('input')) {
            console.log(input.getAttribute('type'));
            input.addEventListener('focus', (e) => { focus(e); });
            input.addEventListener('blur', (e) => { blur(e); });
        }
    }
}
function submit(e) {
    e.preventDefault();
    //console.log('submit',  (e.target as HTMLInputElement).id)
    // let res = {} 
    // for(let field of e.target) { 
    //   if (field.tagName === "INPUT" && field.value){ 
    //     res[field.id] = field; 
    //   } 
    // } 
    // console.log(res) 
}
function blur(e) {
    e.preventDefault();
    console.log('blur', inputIsValid(e.target));
}
function focus(e) {
    e.preventDefault();
    //console.log('focus', (e.target as HTMLInputElement))
    // let res = {} 
    // for(let field of e.target) { 
    //   if (field.tagName === "INPUT" && field.value){ 
    //     res[field.id] = field; 
    //   } 
    // } 
    // console.log(res) 
}
function inputIsValid(input) {
    let res = true;
    switch (input.type) {
        case 'text':
            break;
        case 'email':
            res = validateEmail(input.value);
            break;
        case 'tel':
            res = validatePhone(input.value);
            break;
        case 'password':
            break;
        default:
            break;
    }
    return res;
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePhone(email) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(email);
}
function getFormData() {
    //Array<Indexed>
    let valid = true;
    let data = [];
    for (let form of document.forms) {
        for (let input of form.getElementsByTagName('input')) {
            const currInputIsValid = inputIsValid(input);
            valid = valid && currInputIsValid;
            console.log(input);
            data.push({ name: getInputName(input.id),
                type: input.type,
                value: input.value,
                valid: currInputIsValid
            });
        }
    }
    return { valid, data };
}
function getInputName(id) {
    return id.slice(6).replace('-', '_');
}
export { createValidateEvents, getFormData };
//# sourceMappingURL=validate.js.map