import { get, isEqual, startsWithUpper, uid } from './functions/index'
import { getFormData, createValidateEvents } from './validate/index'

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

function setUtils(): void{

  window.startsWithUpper = startsWithUpper
  window.get = get
  window.uid = uid
  window.getFormData = getFormData
  window.createValidateEvents = createValidateEvents
  window.isEqual = isEqual

}

export { setUtils }