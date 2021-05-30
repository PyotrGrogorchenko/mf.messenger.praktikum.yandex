import { Events } from '../Events'
import { State } from '../State'

export const subscribe = (event: Events, cb: any) => {
  State.getInstance().subscribe(event, cb)
}
