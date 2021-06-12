import { Component } from 'gpp-templator'
import { isPrivateRoute, redirect } from '@router'
import { Err, subscribe } from '@store'

const onUser = () => {
  if (isPrivateRoute()) {
    redirect('#signin')
  }
}

const onErr = (err: Err) => {
  if (err) {
    redirect('#error')
  }
}

export class Root extends Component {
  componentWillMount() {
    subscribe('FLOW_USER', onUser)
    subscribe('FLOW_ERR', onErr)
  }
}
