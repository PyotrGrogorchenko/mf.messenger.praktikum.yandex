import { selectRootComponent, setRootComponent } from '../store'

export const renderApp = (Component: any) => {
  const root: HTMLElement | null = document.querySelector('.app')
  if (!root) throw new Error('Element with class="app" not found')
  const RootComponent = selectRootComponent()
  if (RootComponent) {
    RootComponent.componentWillUnmount()
    RootComponent.unmount()
    RootComponent.componentDidUnmount()
    while (root.firstChild) {
      root.removeChild(root.firstChild)
    }
  }

  const app = new Component(root)
  app.init(root)
  setRootComponent(app)
}
