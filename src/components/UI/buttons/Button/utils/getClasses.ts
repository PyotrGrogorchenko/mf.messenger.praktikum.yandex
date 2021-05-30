type Clsses = {
  button: string
}

export const getClasses = (props: any): Clsses => {
  const button = ['button']
  button.push(`button-${props.style ? props.style : 'main'}`)
  if (props.margin) {
    button.push(`margin-${props.margin}`)
  }
  return {
    button: button.join(' ')
  }
}
