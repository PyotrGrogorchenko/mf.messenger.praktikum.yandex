export const clickEvent = (): void => {
  document.addEventListener('click', e => {
    if (e.button !== 2) {
      const elements = document.querySelectorAll('.cm');
      elements.forEach((el) => {
        el.classList.remove('cm_active')
      })
    }
  }, false)
}
