import './css/index.css'
import { initState } from '@store'
import {
  start, render, privateRoute, redirect
} from './router'

initState().then(() => {
  start()
  if (privateRoute()) {
    redirect('#signin')
  } else {
    render()
  }
})
