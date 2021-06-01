import { EventsStore } from './EventsStore'
import { EventsChatsController } from './EventsChatsController'

export { EventsStore, EventsChatsController }

export type Events = EventsStore | EventsChatsController
