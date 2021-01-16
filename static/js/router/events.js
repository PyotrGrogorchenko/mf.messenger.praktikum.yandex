import { Router } from './Router.js';
function onRouteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let href = null;
    for (let i = 0; i < e.path.length; i++) {
        const el = e.path[i];
        href = el.getAttribute('href');
        if (href && href.startsWith('#{R}')) {
            break;
        }
    }
    if (!href) {
        console.error('Route not found');
        return;
    }
    const router = new Router();
    router.go(`${href === null || href === void 0 ? void 0 : href.slice(4)}`);
}
window.addEventListener("hashchange", function (e) {
    if (window.location.hash === '') {
        window.history.back();
    }
    else {
        const router = new Router();
        router.renderPage(window.location.hash);
    }
}, false);
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