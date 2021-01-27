export const copyObj = (obj) => {
    let res = {};
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            res[key] = obj[key];
        }
        else if (Array.isArray(obj[key])) {
            res[key] = [];
            obj[key].forEach((item) => {
                res[key].push(copyObj(item));
            });
        }
        else {
            res[key] = obj[key];
        }
    }
    return res;
};
//# sourceMappingURL=copyObj.js.map