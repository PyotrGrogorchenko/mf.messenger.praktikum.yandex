import { Props } from 'src/types'

export const consoleMessages = (props: Props) => {
  const { errors, warnings } = props.messages
  if (!errors.length && !warnings.length) return

  // eslint-disable-next-line no-console
  console.log(`${'gpp-loader'.green} in ${props.resourcePath}`)

  if (errors.length) {
    // eslint-disable-next-line no-console
    console.log(`${'ERRORS'.red.bold}`)
    errors.forEach((error) => {
      // eslint-disable-next-line no-console
      console.log(` ${error}`)
    })
  }

  if (warnings.length) {
    // eslint-disable-next-line no-console
    console.log(`${'WARNINGS'.yellow.bold}`)
    warnings.forEach((warning) => {
      // eslint-disable-next-line no-console
      console.log(` ${warning}`)
    })
  }

  // eslint-disable-next-line no-console
  console.log('\n')
}
