function makeDomEvents(): void {

  document.addEventListener("click", e => {
    if (e.button !== 2) {
      let elements = document.querySelectorAll('.cm');
      elements.forEach(function(el) {
        (el as HTMLElement).classList.remove('cm_active')
      })
    }
  }, false);
  
}

export { makeDomEvents }