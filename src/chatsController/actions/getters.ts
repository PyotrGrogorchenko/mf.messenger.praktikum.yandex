import { ChatsController } from '../ChatsController'

export const getCerrentId = (): number => ChatsController.getInstance().currentId
