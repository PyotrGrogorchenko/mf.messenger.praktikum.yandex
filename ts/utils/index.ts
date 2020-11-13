import { startsWithUpper } from './startsWithUpper.js'
import { get } from './get.js'
import { uid } from './uid.js'

// const startsWithUpper = require('startsWithUpper')
// const get = require('get')

//import uid from './uid.js'
//import validate from './validate.js'

declare global {
  interface Window { 
    get: any 
    startsWithUpper: any
    uid: any 
  }
}

window.startsWithUpper = startsWithUpper
window.get = get
window.uid = uid

//validate()