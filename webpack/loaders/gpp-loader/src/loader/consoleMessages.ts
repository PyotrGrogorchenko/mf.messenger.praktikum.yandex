/* eslint-disable no-console */
import { Props } from 'src/types'

export const consoleMessages = (props: Props) => {
  const { errors, warnings } = props.messages
  if (!errors.length && !warnings.length) return

  console.log(`\n${'gpp-loader'.green} in ${props.resourcePath}`)

  if (errors.length) {
    console.log(`${'ERRORS'.red.bold}`)
    errors.forEach((error) => {
      console.log(` ${error}`)
    })
  }

  if (warnings.length) {
    console.log(`${'WARNINGS'.yellow.bold}`)
    warnings.forEach((warning) => {
      console.log(` ${warning}`)
    })
  }
}
