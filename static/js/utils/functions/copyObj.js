export const copyObj = (obj) => {
    // if (Object.keys(a).length !== Object.keys(b).length) {
    //   return false
    // }
    //console.log('obj', obj)
    let res = {};
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            res[key] = obj[key];
        }
        else if (Array.isArray(obj[key])) {
            //res[key] = obj[key].slice()
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