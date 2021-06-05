import { Component } from '@Component'
import { isPrivateRoute, redirect } from '@router'
import { Err, subscribe } from '@store'
import { User } from '@xhrTypes'

const onUser = (user: User) => {
  if (!user && isPrivateRoute()) {
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
