import { get, isEqual, startsWithUpper, uid } from './functions/index.js.js.js.js.js';
import { getFormData, createValidateEvents } from './validate/index.js.js.js.js.js';
function setUtils() {
    window.startsWithUpper = startsWithUpper;
    window.get = get;
    window.uid = uid;
    window.getFormData = getFormData;
    window.createValidateEvents = createValidateEvents;
    window.isEqual = isEqual;
}
export { setUtils };
//# sourceMappingURL=index.js.map