export const get = (obj, path, defaultValue) => {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        result = result[key];
        if (result === undefined) {
            return defaultValue;
        }
    }
    if (result === null) {
        return null;
    }
    return result !== null && result !== void 0 ? result : defaultValue;
};
//# sourceMappingURL=get.js.map