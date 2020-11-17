class Route {

  _pathname: string
  _blockClass: any
  _block: any
  _props: any

  constructor(pathname: string, view: any, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = view;
    this._props = props;
  }


  navigate(pathname: string) {
      if (this.match(pathname)) {
          this._pathname = pathname;
          this.render();
      }
  }

  leave() {

    const root: HTMLElement = document.querySelector(this._props.rootQuery)
    while(root.firstChild) {
      root.removeChild(root.firstChild)  
    }

  }

  match(pathname: string) {
      return pathname === this._pathname
  }

  render() {

    const root: HTMLElement = document.querySelector(this._props.rootQuery)
    const app = new this._blockClass()
    app.render(root)
    window.createValidateEvents()

  }
}

export default Route