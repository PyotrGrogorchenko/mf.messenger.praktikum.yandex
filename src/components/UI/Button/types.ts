export type Classes = {
  button: string
  content: string
  anchor: string
  iconEnd: string
  iconStart: string
}

export type Props = {
  style: 'main' | 'secondary' | 'link' | 'disabled'
  margin: 'big' | 'middle' | 'small'
  align: 'start' | 'center' | 'end'
  icon: string
  id: string
}
