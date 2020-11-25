import { valueIsValid } from './methods.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
// type Indexed<T = number | string | boolean | undefined> = {
//   [key in string]: T | Indexed;
// }
function getFormData() {
    let valid = true;
    let data = [];
    for (let form of document.forms) {
        for (let input of form.getElementsByTagName('input')) {
            const type = input.getAttribute('type');
            const currInputIsValid = valueIsValid(type, input.value);
            valid = valid && currInputIsValid;
            data.push({ name: getInputName(input.id),
                type,
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
export { getFormData };
//# sourceMappingURL=data.js.map