import { EventsStore } from '@EventsBus'
import { State } from '../State'

export const subscribe = (event: EventsStore, cb: any) => {
  State.getInstance().subscribe(event, cb)
}
