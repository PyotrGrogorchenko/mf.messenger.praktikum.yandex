import { get, isEqual, startsWithUpper, uid, regexpMatchAll, queryStringify, copyObj } from './functions/index.js';
import { getFormData, createValidateEvents } from './validate/index.js';
function setUtils() {
    window.startsWithUpper = startsWithUpper;
    window.get = get;
    window.uid = uid;
    window.getFormData = getFormData;
    window.createValidateEvents = createValidateEvents;
    window.isEqual = isEqual;
    window.regexpMatchAll = regexpMatchAll;
    window.queryStringify = queryStringify;
    window.copyObj = copyObj;
}
export { setUtils };
//# sourceMappingURL=index.js.map