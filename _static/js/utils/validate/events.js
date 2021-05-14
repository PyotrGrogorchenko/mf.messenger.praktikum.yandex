function createValidateEvents() {
    for (let form of document.forms) {
        form.addEventListener('submit', (e) => { submit(e); });
        for (let input of form.getElementsByTagName('input')) {
            input.addEventListener('focus', (e) => { focus(e); });
            input.addEventListener('blur', (e) => { blur(e); });
        }
    }
}
function submit(e) {
    e.preventDefault();
}
function blur(e) {
    e.preventDefault();
}
function focus(e) {
    e.preventDefault();
}
export { createValidateEvents };
//# sourceMappingURL=events.js.map