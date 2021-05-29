import { Events } from './Events'
import { State } from './State'

const getEventBus = () => State.getInstance().eventBus

export const subscribe = (event: Events, cb: any) => {
  getEventBus().on(event, cb)
}
