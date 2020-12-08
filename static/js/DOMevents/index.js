function makeDomEvents() {
    document.addEventListener("click", e => {
        if (e.button !== 2) {
            let elements = document.querySelectorAll('.cm');
            elements.forEach(function (el) {
                el.classList.remove('cm_active');
            });
        }
    }, false);
}
export { makeDomEvents };
//# sourceMappingURL=index.js.map