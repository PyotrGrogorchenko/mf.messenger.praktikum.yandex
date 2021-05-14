export const startsWithUpper = (str) => {
    str = str.trim();
    if (str.length === 0) {
        return false;
    }
    return str[0] === str[0].toUpperCase();
};
//# sourceMappingURL=startsWithUpper.js.map