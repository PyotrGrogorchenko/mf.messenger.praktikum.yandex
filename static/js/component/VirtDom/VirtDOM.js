import { PARSER_TYPES } from '../parser.js';
import { Node } from './Node.js';
class VirtDom {
    constructor() {
        this._nodes = Array();
        this._parent = this._func_parent();
        this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
        this._deleteMark = false;
    }
    get deleteMark() { return this._deleteMark; }
    set deleteMark(value) { this._deleteMark = value; }
    compile(parsedTemplate, state, props, _deleteMark) {
        this.deleteMark = _deleteMark;
        this._setNodesDeleteMark();
        this._compileTemplate(parsedTemplate, state, props);
    }
    _compileTemplate(parsedTemplate, state, props) {
        const context = { state, props };
        const template = { list: parsedTemplate, record: null, i: 0 };
        for (template.i = 0; template.i < template.list.length; template.i++) {
            template.record = template.list[template.i];
            if (template.record.type === PARSER_TYPES.CODE) {
                this._compileCode(context, template);
            }
            else {
                this._compileItem(context, template);
            }
        }
    }
    _compileItem(context, template) {
        switch (template.record.type) {
            case PARSER_TYPES.END:
                this._closeTag();
                break;
            case PARSER_TYPES.TEXT:
                this._compileItem_process(context, template);
                break;
            case PARSER_TYPES.BEGIN:
                this._compileItem_process(context, template);
                break;
            default:
                throw new Error(`Tree: error initializing the tree for: ${template.record.type} ${template.record.content}`);
        }
    }
    _compileItem_process(context, template) {
        const { record } = template;
        if (record.type === PARSER_TYPES.BEGIN) {
            const tagName = this._getTagName(record.content);
            const newProps = this._getHeaderProps(context, template, tagName);
            let node = this.getNodeByUidKey(record.uid, newProps.key);
            if (node) {
                node.setChangedProps(newProps, node.props);
                node.tagName = tagName;
                node.props = newProps;
                node.deleteMark = this.deleteMark || record.deleteMark;
            }
            else {
                if (this.deleteMark || record.deleteMark) {
                    return;
                }
                node = new Node();
                this._nodes.push(node);
                node.tagName = tagName;
                node.props = newProps;
                node.header = record.content;
                node.uid = record.uid;
                node.key = newProps.key ? newProps.key : '';
                node.setLevel();
                node.setSignComponent();
                node.setChangedProps(node.props);
            }
            node.parent = this._parent('add', node);
        }
        else if (record.type === PARSER_TYPES.TEXT) {
            let owner = this._parent('', null);
            if (owner && !owner.isComponent) {
                owner.setContentProps(context, template);
            }
        }
    }
    _compileCode(context, template) {
        this._compileCode__cycle_for(context, template);
        this._compileCode__if(context, template);
    }
    _compileCode__cycle_for(context, template) {
        let code = template.record.content.slice(2, template.record.content.indexOf('%}')).trim();
        if (!code.startsWith('for'))
            return;
        const codeHead = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(';');
        const begin = codeHead[0].trim().split(' ').filter((item) => item);
        const iName = begin[1];
        context[iName] = Number(begin[3]);
        const condition = codeHead[1].trim().split(' ').filter((item) => item);
        const sign = condition[1];
        const right = window.get(context, condition[2], 0);
        let step = codeHead[2].trim().replace(begin[1], '');
        const codeTail = code.substring(code.indexOf('{') + 1).trim().split(';').filter((item) => item).map((item) => item.trim());
        const vars = [];
        codeTail.forEach(function (item) {
            if (item.startsWith('let') || item.startsWith('const')) {
                vars.push(item.substring(item.indexOf(' ')).replace(/ /ig, '').split('='));
            }
        });
        const iStart = template.i;
        for (context[iName]; this._compare(context[iName], sign, right); context[iName] = context[iName] + this._inc(step)) {
            vars.forEach(function (variable) {
                const param_i = /\[(.)\]/gm.exec(variable[1]);
                context[variable[0]] = window.get(context, variable[1].substring(0, param_i === null || param_i === void 0 ? void 0 : param_i.index))[context[param_i[1]]];
            });
            template.i = iStart;
            template.i++;
            let key = null;
            for (template.i; template.i < template.list.length; template.i++) {
                const record = Object.assign({}, template.list[template.i]);
                template.record = record;
                if (record.type === PARSER_TYPES.CODE) {
                    if (this._code__isCloseBracket(template)) {
                        template.i++;
                        template.record = Object.assign({}, template.list[template.i]);
                        break;
                    }
                    this._compileCode(context, template);
                }
                window.regexpMatchAll(record.content, this._REGEXP_PARAM).forEach(function (param) {
                    vars.forEach(function (variable) {
                        if (param[1] && param[1].startsWith(variable[0])) {
                            context.state[variable[0]] = context[variable[0]];
                            record.content = record.content.replace(param[0], '{{state.' + param[1] + '}}');
                        }
                    });
                });
                // key \\
                if (record.type === PARSER_TYPES.BEGIN) {
                    const keyIndex = record.content.indexOf('key');
                    if (keyIndex > 0) {
                        const paramKey = new RegExp(this._REGEXP_PARAM).exec(record.content.substring(keyIndex));
                        key = window.get(context, paramKey[1], paramKey[1]);
                        record.content = record.content.replace(new RegExp(paramKey[0], 'g'), key);
                    }
                    else {
                        record.content += ' key=' + key;
                    }
                }
                // key //
                this._compileItem(context, template);
            }
        }
    }
    _compileCode__if(context, template) {
        let code = template.record.content.slice(2, template.record.content.indexOf('%}')).trim();
        if (!code.startsWith('if'))
            return;
        const isElse = () => {
            return template.record.content.replace(/ /ig, '') === '{%}else{%}';
        };
        const codeParam = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim();
        const rgParam = new RegExp(this._REGEXP_PARAM).exec(codeParam);
        let param = true;
        if (rgParam) {
            param = window.get(context, rgParam[1], rgParam[1]);
        }
        template.i++;
        for (template.i; template.i < template.list.length; template.i++) {
            const record = template.list[template.i];
            template.record = record;
            if (record.type === PARSER_TYPES.CODE) {
                if (isElse()) {
                    param = !param;
                    continue;
                }
                else if (this._code__isCloseBracket(template)) {
                    break;
                }
                else {
                    if (param) {
                        this._compileCode(context, template);
                    }
                    else {
                        while (!this._code__isCloseBracket(template) && template.i < template.list.length) {
                            template.i++;
                            template.record = template.list[template.i];
                        }
                        continue;
                    }
                }
            }
            record.deleteMark = !param;
            if (param) {
                this._compileItem(context, template);
            }
        }
    }
    _code__isCloseBracket(template) {
        return template.record.content.replace(/ /ig, '') === '{%}%}';
    }
    _getHeaderProps(context, template, tagName) {
        let { content } = template.record;
        const node_props = {};
        const cacheTxt = {};
        let count = 1;
        window.regexpMatchAll(content, /[\'\"](.*?)[\'\"]/gi).forEach(function (txt) {
            if (txt[0]) {
                cacheTxt[`text${count}`] = txt[0];
                content = content.replace(txt[0], `text${count}`);
                count++;
            }
        });
        content.split(' ').forEach((keyValue) => {
            if (!keyValue || keyValue === tagName) {
                return;
            }
            const arrKeyValue = keyValue.split('=');
            if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
                arrKeyValue[1] = cacheTxt[arrKeyValue[1]];
            }
            const param = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1]);
            if (arrKeyValue[0] === 'className') {
                const strClasses = param ? window.get(context, param[1], '') : arrKeyValue[1].replace(/[\'\"]/g, '');
                node_props.classes = strClasses.split(' ');
            }
            else if (arrKeyValue.length === 1) {
                node_props[arrKeyValue[0]] = '#noValue';
            }
            else if (param) {
                node_props[arrKeyValue[0]] = window.get(context, param[1], param[1]);
            }
            else {
                node_props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '');
            }
        });
        return node_props;
    }
    _compare(left, sign, right) {
        switch (sign) {
            case '<': return left < right;
            case '<=': return left <= right;
            case '>': return left > right;
            case '>=': return left >= right;
            default:
                throw new Error(`Compare error`);
        }
    }
    _inc(step) {
        switch (step) {
            case '++': return 1;
            case '--': return -1;
            default:
                throw new Error(`Step error`);
        }
    }
    _closeTag() {
        this._parent('remove', null);
    }
    _func_parent() {
        const parentsStack = Array();
        return function (command = '', node = null) {
            let res = null;
            if (command === 'remove') {
                parentsStack.pop();
            }
            else if (parentsStack.length > 0) {
                res = parentsStack[parentsStack.length - 1];
            }
            if (command === 'add') {
                parentsStack.push(node);
            }
            return res;
        };
    }
    _setNodesDeleteMark() {
        this._nodes.forEach(function (node) {
            node.deleteMark = true;
        });
    }
    _getTagName(str) {
        const begin = 0;
        const end = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ');
        return str.slice(begin, end);
    }
    getIsComponent() {
        return this._nodes.filter(node => node.isComponent === true);
    }
    getNodes() {
        return this._nodes;
    }
    getNodeByUidKey(uid, key) {
        for (let i = 0; i < this._nodes.length; i++) {
            let node = this._nodes[i];
            if ((!key && node.uid === uid) || (key && node.key === key && node.uid === uid)) {
                return node;
                break;
            }
        }
        return null;
    }
    deleteMarkedNodes() {
        this._nodes.forEach((node) => {
            var _a;
            if (node.deleteMark) {
                if (node.isComponent && node.componentLink) {
                    (_a = node.componentLink.virtDOM) === null || _a === void 0 ? void 0 : _a.deleteMarkedNodes();
                }
                this._nodes = this._nodes.filter((node) => !node.deleteMark);
            }
        });
    }
    printNodes() {
        console.log('////////////////////////////////////////////////');
        this._nodes.forEach(function (node) {
            console.log(node.deleteMark, node);
        });
    }
}
export { VirtDom };
//# sourceMappingURL=VirtDOM.js.map