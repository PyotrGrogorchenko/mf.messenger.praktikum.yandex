import { Router } from './Router.js';
function onRouteClick(e) {
    e.preventDefault();
    let href = e.target.getAttribute('href');
    if (!href) {
        console.error('Route not found');
        return;
    }
    const router = new Router();
    router.go(`/${href === null || href === void 0 ? void 0 : href.slice(4)}`);
}
// window.addEventListener("hashchange", function(e: Event) {
//   console.log('hashchange', e)
// }, false)
// window.addEventListener('popstate', function(e: Event) {
//   console.log('popstate', e)
// })
// window.addEventListener('beforeunload', function(e: Event) {
//   console.log('beforeunload', e)
// })
// window.addEventListener('unload', function(e: Event) {
//   console.log('unload', e)
// })
export { onRouteClick };
//# sourceMappingURL=events.js.map