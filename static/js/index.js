import { startRouter } from "./router/index.js";
import { setUtils } from "./utils/index.js";
import { initDomEvents } from "./DOMevents/index.js";
import { defaultPage } from "./router/utils.js";
setUtils();
startRouter();
initDomEvents();
startApp();
function startApp() {
    defaultPage(window.location.hash);
}
//# sourceMappingURL=index.js.map