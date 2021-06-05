import { Component } from '@Component'

export class Error404 extends Component {
  template() {
    return (
      `<Root>
        <ErrorBar 
          errCode='404'
          message='Wrong way'
          href='#{R}#chat'
        ></>
      </Root>`
    )
  }
}
