import { Props } from '../types'

export const show = (props: Props) => props.message.type === 'message'
