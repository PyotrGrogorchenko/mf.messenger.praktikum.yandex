import { startsWithUpper } from './startsWithUpper.js'
import { get } from './get.js'

// const startsWithUpper = require('startsWithUpper')
// const get = require('get')

//import uid from './uid.js'
//import validate from './validate.js'

declare global {
  interface Window { 
    get: any 
    startsWithUpper: any
  }
}

window.startsWithUpper = startsWithUpper
window.get = get

//validate()