import {
  get,
  isEqual,
  startsWithUpper,
  uid,
  regexpMatchAll,
  queryStringify,
  copyObj
} from './functions/index'

import { getFormData, createValidateEvents } from './validate/index'

declare global {
  interface Window {
    get: any
    startsWithUpper: any
    uid: any
    getFormData: any
    createValidateEvents: any
    isEqual: any
    regexpMatchAll: any
    queryStringify: any
    copyObj: any
  }

  interface MouseEvent {
    path: Array<HTMLElement>
  }
}

function setUtils(): void {
  window.startsWithUpper = startsWithUpper
  window.get = get
  window.uid = uid
  window.getFormData = getFormData
  window.createValidateEvents = createValidateEvents
  window.isEqual = isEqual
  window.regexpMatchAll = regexpMatchAll
  window.queryStringify = queryStringify
  window.copyObj = copyObj
}

export { setUtils }
