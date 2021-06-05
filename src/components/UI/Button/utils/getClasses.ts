import { getIconClass } from '@icons'
import { Classes } from '../types'

export const getClasses = (props: any): Classes => {
  const {
    style, margin, align, icon
  } = props

  const button = ['button']
  button.push(`button-${style || 'main'}`)
  if (margin) button.push(`margin-${margin}`)

  const content = ['button-content']
  content.push(`button-content_${align || 'center'}`)

  const anchor = ['']
  anchor.push(`button-${style || 'main'}_anchor`)

  const iconEnd = ['']
  const iconStart = ['']

  const iconClass = getIconClass(icon)
  if (icon && iconClass) {
    if (align === 'end') {
      iconEnd.push(iconClass)
      iconEnd.push(`button-${style || 'main'}_anchor`)
      iconEnd.push('button_icon-end')
    } else {
      iconStart.push(iconClass)
      iconStart.push(`button-${style || 'main'}_anchor`)
      iconStart.push('button_icon-start')
    }
  }

  return {
    button: button.join(' '),
    content: content.join(' '),
    anchor: anchor.join(' '),
    iconStart: iconStart.join(' '),
    iconEnd: iconEnd.join(' ')
  }
}
