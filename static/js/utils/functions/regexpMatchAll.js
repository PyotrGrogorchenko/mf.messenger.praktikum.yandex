function regexpMatchAll(str, TEMPLATE_REGEXP) {
    let key = null;
    const res = [];
    // Важно делать exec именно через константу, иначе уйдёте в бесконечный цикл
    while ((key = TEMPLATE_REGEXP.exec(str))) {
        res.push(key);
    }
    return res;
}
export { regexpMatchAll };
//# sourceMappingURL=regexpMatchAll.js.map