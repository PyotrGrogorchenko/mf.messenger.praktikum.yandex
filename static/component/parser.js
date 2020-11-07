"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARSER_TYPES = exports.parser = void 0;
var PARSER_TYPES;
(function (PARSER_TYPES) {
    PARSER_TYPES[PARSER_TYPES["BEGIN"] = 0] = "BEGIN";
    PARSER_TYPES[PARSER_TYPES["END"] = 1] = "END";
    PARSER_TYPES[PARSER_TYPES["TEXT"] = 2] = "TEXT";
    PARSER_TYPES[PARSER_TYPES["CODE"] = 3] = "CODE";
})(PARSER_TYPES || (PARSER_TYPES = {}));
exports.PARSER_TYPES = PARSER_TYPES;
function parser(str) {
    //return parserREGEXP(str) ??? Не получилось найти <tag> с помощью REGEXP, если <tag> в несколтких строках ???
    return parserNoREGEXP(str);
}
exports.parser = parser;
function parserREGEXP(str) {
    const PARSE_REGEXP = /\<(.*?)\>/gim;
    const strOrigin = str;
    const res = Array();
    const addItem = (type, content) => {
        res.push({ type, content });
    };
    let key = null;
    while ((key = PARSE_REGEXP.exec(strOrigin))) {
        //const tagProps = {type: null, content: null}
        const isEndTag = key[0].startsWith('</');
        addItem(isEndTag ? PARSER_TYPES.END : PARSER_TYPES.BEGIN, isEndTag ? key[1].slice(1) : key[1]);
        str = str.slice(str.indexOf(key[0]) + key[0].length);
        if (!isEndTag) {
            if (str.indexOf('<') >= 0) {
                const content = str.substring(0, str.indexOf('<')).trim();
                if (content) {
                    addItem(PARSER_TYPES.TEXT, content);
                }
            }
        }
    }
    return res;
}
function parserNoREGEXP(str) {
    const res = Array();
    str = str.replace(/{%/g, '<{%');
    str = str.replace(/%}/g, '%}>');
    const addItem = (type, content) => {
        res.push({ type, content });
    };
    while (str) {
        const beginTagPos = str.indexOf('<');
        let endTagPos = str.indexOf('>');
        const isCode = str.startsWith('<{%');
        endTagPos = isCode ? str.indexOf('%}>') + 2 : endTagPos;
        let tagContent = str.slice(beginTagPos + 1, endTagPos).trim();
        tagContent = tagContent.replace(/[\r\n]+/g, '');
        const isEndTag = tagContent.startsWith('/');
        if (isCode) {
            addItem(PARSER_TYPES.CODE, tagContent);
        }
        else {
            addItem(isEndTag ? PARSER_TYPES.END : PARSER_TYPES.BEGIN, isEndTag ? tagContent.slice(1) : tagContent);
        }
        str = str.slice(endTagPos + 1).trim();
        //if (!isEndTag) {
        if (str.indexOf('<') >= 0) {
            const content = str.substring(0, str.indexOf('<')).trim();
            if (content) {
                addItem(PARSER_TYPES.TEXT, content);
            }
            str = str.slice(str.indexOf('<')).trim();
        }
        //}
    }
    return res;
}
//# sourceMappingURL=parser.js.map