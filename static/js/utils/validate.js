"use strict";
(function () {
    for (let form of document.forms) {
        form.addEventListener('submit', (e) => { submit(e); });
        for (let input of form.getElementsByTagName('input')) {
            input.addEventListener('focus', (e) => { focus(e); });
            input.addEventListener('blur', (e) => { blur(e); });
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
        let input = e.target;
        switch (input.type) {
            case 'text':
                break;
            case 'email':
                console.log('email', validateEmail(input.value));
                break;
            case 'tel':
                console.log('tel', validatePhone(input.value));
                break;
            case 'password':
                break;
            default:
                break;
        }
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
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function validatePhone(email) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(email);
    }
})();
//# sourceMappingURL=validate.js.map