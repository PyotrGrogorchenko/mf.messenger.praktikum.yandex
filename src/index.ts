import './css/index.css'
import { initState, throwError } from '@store'
import { start, render } from './router'

initState()
  .then(
    () => {
      start()
      render()
    }
  ).catch(() => {
    throwError('Something went wrong', 500)
  })
