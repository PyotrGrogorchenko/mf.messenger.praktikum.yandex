import { getIconClass } from '@icons'
import { Classes } from '../types'

export const getClasses = (props: any): Classes => {
  const avatarSrc = props.avatar

  const avatar = ['avatar-src']
  const avatarEmpty = ['avatar-empty']
  const icon = [getIconClass('camera')]

  if (avatarSrc) {
    avatarEmpty.push('avatar_hide')
  } else {
    avatar.push('avatar_hide')
  }

  return {
    avatar: avatar.join(' '),
    avatarEmpty: avatarEmpty.join(' '),
    icon: icon.join(' ')
  }
}
