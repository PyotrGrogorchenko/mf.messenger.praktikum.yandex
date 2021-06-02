import { IconTypes } from './types'
import { iconsClasses } from './icons'

export const getIconClass = (iconType: IconTypes): string => {
  const iconClass = iconsClasses[iconType]
  return iconClass
}
