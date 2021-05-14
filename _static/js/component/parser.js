var PARSER_TYPES;
(function (PARSER_TYPES) {
    PARSER_TYPES[PARSER_TYPES["BEGIN"] = 0] = "BEGIN";
    PARSER_TYPES[PARSER_TYPES["END"] = 1] = "END";
    PARSER_TYPES[PARSER_TYPES["TEXT"] = 2] = "TEXT";
    PARSER_TYPES[PARSER_TYPES["CODE"] = 3] = "CODE";
})(PARSER_TYPES || (PARSER_TYPES = {}));
function parser(str) {
    return parserNoREGEXP(str);
}
function parserNoREGEXP(str) {
    const res = Array();
    str = str.replace(/{%/g, '<{%');
    str = str.replace(/%}/g, '%}>');
    const addItem = (type, content) => {
        const uid = type === PARSER_TYPES.BEGIN ? window.uid() : 0;
        res.push({ type, content, uid: uid, deleteMark: false });
    };
    str = str.split(/\n/g).reduce(function (result, current) {
        const currentClean = current.replace(/\s/g, '');
        if (currentClean.startsWith('//')) {
            return result;
        }
        return result + '\n' + current;
    }, '').trim();
    while (str) {
        const beginTagPos = str.indexOf('<');
        let endTagPos = str.indexOf('>');
        const isCode = str.startsWith('<{%');
        endTagPos = isCode ? str.indexOf('%}>') + 2 : endTagPos;
        let tagContent = str.slice(beginTagPos + 1, endTagPos).trim().replace(/[\r\n]+/g, '');
        const isEndTag = tagContent.startsWith('/');
        if (isCode) {
            addItem(PARSER_TYPES.CODE, tagContent);
        }
        else {
            addItem(isEndTag ? PARSER_TYPES.END : PARSER_TYPES.BEGIN, isEndTag ? tagContent.slice(1) : tagContent);
        }
        str = str.slice(endTagPos + 1).trim();
        if (str.indexOf('<') >= 0) {
            const content = str.substring(0, str.indexOf('<'));
            if (content) {
                addItem(PARSER_TYPES.TEXT, content);
            }
            str = str.slice(str.indexOf('<')).trim();
        }
    }
    return res;
}
export { parser, PARSER_TYPES };
//# sourceMappingURL=parser.js.map