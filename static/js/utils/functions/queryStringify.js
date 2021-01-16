export const queryStringify = (data) => {
    if (!data) {
        return '';
    }
    let res = '';
    for (let [key, value] of Object.entries(data)) {
        res += `&${key}=${value}`;
    }
    if (res) {
        res = '?' + res.substr(1);
    }
    return res;
};
//# sourceMappingURL=queryStringify.js.map