function valueIsValid(type, val) {
    return validateText(val);
    let res = true;
    switch (type) {
        case 'text':
            res = validateText(val);
            break;
        case 'login':
            res = validateLogin(val);
            break;
        case 'name':
            res = validateName(val);
            break;
        case 'mail':
            res = validateEmail(val);
            break;
        case 'phone':
            res = validatePhone(val);
            break;
        case 'password':
            res = validatePassword(val);
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
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{4,}$/.test(val);
}
export { valueIsValid };
//# sourceMappingURL=methods.js.map