import { Router } from './Router.js';
import Login from '../components/pages/login/login.js';
import Signup from '../components/pages/signup/signup.js';
import Index from '../components/pages/index/index.js';
import Chat from '../components/pages/chat/chat.js';
import UserSettings from '../components/pages/userSettings/userSettings.js';
import Error404 from '../components/pages/error404/error404.js';
import Error500 from '../components/pages/error500/error500.js';
import TestPage from '../components/pages/testPage/testPage.js';
function startRouter() {
    const router = new Router('.app');
    router
        .use('/', Index)
        .use('#login', Login)
        .use('#signup', Signup)
        .use('#chat', Chat)
        .use('#error404', Error404)
        .use('#error500', Error500)
        .use('#userSettings', UserSettings)
        .use('#testPage', TestPage)
        .start();
}
export { startRouter };
//# sourceMappingURL=index.js.map