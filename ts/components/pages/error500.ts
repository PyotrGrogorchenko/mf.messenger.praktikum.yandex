import Component from '../../component/component.js'
import ErrorBar from '../error-bar.js'

class App extends Component {

  components() {return {ErrorBar}}
  
  template() { 

    return  (
      `<ErrorBar errCode='500' message='Sorry, something is wrong'></>`
    )
  }

}  

const root: HTMLElement | null = document.querySelector(".app")
const app: App = new App()
app.render(root)
