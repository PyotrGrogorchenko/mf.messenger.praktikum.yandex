export const getContextMenuClickType = (e) => {
    let res = '';
    for (let i = 0; i < e.path.length; i++) {
        if (e.path[i].tagName === 'LI') {
            res = e.path[i].getAttribute('id');
            break;
        }
    }
    return res;
};
//# sourceMappingURL=getContextMenuClickType.js.map