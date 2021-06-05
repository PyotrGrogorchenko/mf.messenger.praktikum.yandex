import { urlBase } from '@xhr'

export const getAvatarSrc = (props: any): string => {
  if (!props.avatar) return ''
  return `${urlBase}/resources${props.avatar}`
}
