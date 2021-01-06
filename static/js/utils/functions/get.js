export const get = (obj, path, defaultValue) => {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        result = result[key];
        if (result === undefined || result === null) {
            return defaultValue;
        }
    }
    return result !== null && result !== void 0 ? result : defaultValue; // "??" — [оператор нуллевого слияния](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (не поддерживается старыми браузерами, для них нужен полифил)
};
//# sourceMappingURL=get.js.map