import { Component } from '@Component'
import { isPrivateRoute, redirect } from '@router'
import { subscribe } from '@store'
import { User } from '@xhrTypes'

const onUser = (user: User) => {
  if (!user && isPrivateRoute()) {
    redirect('#signin')
  }
}

export class Root extends Component {
  componentWillMount() {
    subscribe('FLOW_USER', onUser)
  }
}
