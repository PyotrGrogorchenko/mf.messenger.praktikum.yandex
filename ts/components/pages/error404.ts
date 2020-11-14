import Component from '../../component/component.js'
import ErrorBar from '../error-bar.js'

export default class App extends Component {

  components() {return {ErrorBar}}
  
  template() { 

    return  (
      `<ErrorBar errCode='404' message='Wrong way'></>`
    )
  }

}  

// const root: HTMLElement | null = document.querySelector(".app")
// const app: App = new App()
// app.render(root)
