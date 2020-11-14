import { Router } from './Router.js';
import Login from '../components/pages/login.js';
import Signup from '../components/pages/signup.js';
import Index from '../index.js';
const router = new Router('.app');
router.use('/', Index)
    .use('/login', Login)
    .use('/signup', Signup)
    .start();
console.log(document.querySelector('.app'));
//# sourceMappingURL=index.js.map