import { get, isEqual, startsWithUpper, uid } from './functions/index.js'
import { getFormData, createValidateEvents } from './validate/index.js'

declare global {
  interface Window { 
    get: any 
    startsWithUpper: any
    uid: any 
    getFormData: any
    createValidateEvents: any
    isEqual: any
  }
}

window.startsWithUpper = startsWithUpper
window.get = get
window.uid = uid
window.getFormData = getFormData
window.createValidateEvents = createValidateEvents
window.isEqual = isEqual