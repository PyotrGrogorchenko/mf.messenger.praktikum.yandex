import { valueIsValid } from './methods.js';
export const getFormData = () => {
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
};
function getInputName(id) {
    return id.slice(6).replace('-', '_');
}
//# sourceMappingURL=data.js.map