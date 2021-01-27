export const isEqual = (a, b) => {
    if (a === null) {
        if (b !== null) {
            return false;
        }
        return true;
    }
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    let res = true;
    for (const key in a) {
        if (Array.isArray(a[key])) {
            if (!Array.isArray(b[key])) {
                return false;
            }
            if (a[key].lenght !== b[key].lenght) {
                return false;
            }
            for (let i = 0; i < a[key].lenght; i++) {
                res = isEqual(a[key][i], b[key][i]);
                if (!res)
                    return res;
            }
        }
        if (typeof a[key] === 'object') {
            res = isEqual(a[key], b[key]);
            if (!res)
                return res;
        }
        else if (a[key] !== b[key]) {
            return false;
        }
    }
    return res;
};
//# sourceMappingURL=isEqual.js.map