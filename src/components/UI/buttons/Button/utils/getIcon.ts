// type Res = {
//   show: boolean
//   class: string
// }

const icons: LooseObject = {
  arrow: 'fas fa-long-arrow-alt-right'
}

export const getIcon = (props: any): string => {
  if (!props.icon || !icons[props.icon]) return ''
  const classes = [icons[props.icon]]
  if (props.style === 'secondary') {
    classes.push('c-secondary')
  } else {
    classes.push('c-white')
  }
  return classes.join(' ')
}
