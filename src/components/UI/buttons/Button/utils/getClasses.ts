import { icons } from './icons'

type Res = {
  button: string,
  content: string,
  anchor: string,
  iconEnd: string,
  iconStart: string
}

export const getClasses = (props: any): Res => {
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

  if (icon && icons[icon]) {
    const iconClass = icons[icon]
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
