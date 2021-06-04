import dateFormat from 'dateformat'

export const formatDate = (val: string | Date): string => {
  if (!val) return ''
  const date = typeof val === 'string' ? new Date(val) : val
  const dateDif = (new Date().getTime() - date.getTime()) / 1000
  if (dateDif < 1) {
    return 'a second ago'
  } if (dateDif < 60) {
    return 'a minute ago'
  } if (dateDif < 60 * 60) {
    return 'a hour ago'
  }
  return dateFormat(date, 'mmmm dS yyyy h:MM:ss TT')
}
