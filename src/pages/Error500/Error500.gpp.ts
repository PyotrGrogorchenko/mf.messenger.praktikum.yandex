import { Component } from '@Component'

export class Error500 extends Component {
  template() {
    return (
      `<Root>
        <ErrorBar
          errCode='500'
          message='Sorry, something is wrong'
          href='#{R}#chat'
        ></>
      </Root>`
    )
  }
}
