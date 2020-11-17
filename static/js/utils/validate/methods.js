function inputIsValid(input) {
    let res = true;
    switch (input.getAttribute('type')) {
        case 'text':
            res = validateText(input.value);
            break;
        case 'login':
            res = validateText(input.value);
            //res = validateLogin(input.value)
            break;
        case 'name':
            res = validateText(input.value);
            //res = validateName(input.value)
            break;
        case 'mail':
            res = validateText(input.value);
            //res = validateEmail(input.value)
            break;
        case 'phone':
            res = validateText(input.value);
            //res = validatePhone(input.value)
            break;
        case 'password':
            res = validateText(input.value);
            //res = validatePassword(input.value)
            break;
        default:
            break;
    }
    return res;
}
function validateText(val) {
    return val.length > 0;
}
function validateLogin(val) {
    return /^[a-zA-Z\-\_]+$/.test(val);
}
function validateName(val) {
    return /^[a-zA-Z\s]+$/.test(val);
}
function validateEmail(val) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
}
function validatePhone(val) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val);
}
function validatePassword(val) {
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(val);
}
export { inputIsValid };
//# sourceMappingURL=methods.js.map