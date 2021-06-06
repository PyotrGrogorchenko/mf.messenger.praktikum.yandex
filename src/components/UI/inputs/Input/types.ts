export type Classes = {
  input: string
  label: string
  tip: string
}

export type Props = {
  label: string
  type: string
  id: string
  style: 'main' | 'secondary'
  fontSize: 'big' | 'middle' | 'small'
  value: string
  valid: boolean
  onBlur: (e: FocusEvent) => void
}
