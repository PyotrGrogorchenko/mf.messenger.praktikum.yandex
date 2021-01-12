import { PARSER_TYPES } from './parser.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
var ACTION;
(function (ACTION) {
    ACTION[ACTION["NEW"] = 0] = "NEW";
    ACTION[ACTION["UPDATE"] = 1] = "UPDATE";
    ACTION[ACTION["DELETE"] = 2] = "DELETE";
    ACTION[ACTION["NO"] = 3] = "NO";
})(ACTION || (ACTION = {}));
class Node {
    constructor() {
        this.uid = '';
        this.uidNum = 0;
        this.key = '';
        this.level = 0;
        this.owner = null;
        this.header = '';
        this.tagName = '';
        this.textContent = '';
        this.isComponent = false;
        this.props = {};
        this.componentLink = null;
        this.root = null;
        //action: ACTION = ACTION.NEW 
        this.changedProps = [];
        this.textContentIsChanged = false;
        this.isNew = true;
        this.element = null;
    }
}
class StackItems {
    constructor() {
        this._stack = [];
    }
    add(item) {
        this._stack.push(item);
    }
    get length() { return this._stack.length; }
    getItemByIndex(index) {
        return this._stack[index];
    }
}
class VirtDom {
    constructor() {
        this._nodes = Array();
        this._getOwner = this._func_getOwner();
        this._currentUid = 0;
        this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
        // _setKey(node: Node): void {
        //   node.key = node.props.key
        //   if (!node.key && node.owner) {
        //     node.key = node.owner.props.key
        //     if (node.content.indexOf('key=') < 0 ){
        //       node.header += ' key="' + node.key + '"'
        //       node.props.key = node.key
        //     }
        //   }
        // }
    }
    compile(parsedTemplate, state, props) {
        for (let i = 0; i < parsedTemplate.length; i++) {
            const item = parsedTemplate[i];
            if (item.type === PARSER_TYPES.CODE) {
                i = this._compileCode(item, state, props, parsedTemplate, i);
            }
            else {
                this._compileItem(item, state, props);
            }
        }
    }
    getIsComponent() {
        return this._nodes.filter(node => node.isComponent === true);
    }
    getNodes() {
        return this._nodes;
    }
    getNodeByUidKey(uidNum, key) {
        for (let i = 0; i < this._nodes.length; i++) {
            let node = this._nodes[i];
            if ((!key && node.uidNum === uidNum) || (key && node.key === key && node.uidNum === uidNum)) {
                return node;
                break;
            }
        }
        return null;
    }
    static getTagName(str) {
        const begin = 0;
        const end = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ');
        return str.slice(begin, end);
    }
    _compileItem(item, state, props) {
        switch (item.type) {
            case PARSER_TYPES.END:
                this._closeTag();
                break;
            case PARSER_TYPES.TEXT:
                this._addNode(item, state, props);
                break;
            case PARSER_TYPES.BEGIN:
                this._addNode(item, state, props);
                break;
            default:
                throw new Error(`Tree: error initializing the tree for: ${item.type} ${item.content}`);
        }
    }
    _func_getOwner() {
        const ownersStack = Array();
        return function (command = '', node = null) {
            let res = null;
            if (command === 'remove') {
                ownersStack.pop();
            }
            else if (ownersStack.length > 0) {
                res = ownersStack[ownersStack.length - 1];
            }
            if (command === 'add') {
                ownersStack.push(node);
            }
            return res;
        };
    }
    _addNode(item, state, props) {
        if (item.type === PARSER_TYPES.BEGIN) {
            const tagName = VirtDom.getTagName(item.content);
            const newProps = this._getHeaderProps({ header: item.content, tagNme: tagName, state, props });
            let node = this.getNodeByUidKey(item.uid, newProps.key);
            if (node) {
                node.changedProps = this._getChangedProps(newProps, node.props);
                node.tagName = tagName;
                node.props = newProps;
                //node.action = ACTION.UPDATE
            }
            else {
                node = new Node();
                this._nodes.push(node);
                node.tagName = tagName;
                node.props = newProps;
                node.isComponent = this._setSignComponent(node.tagName);
                node.header = item.content;
                node.level = this._getLevel(node);
                node.uidNum = item.uid;
                node.key = newProps.key ? newProps.key : '';
                node.uid = node.uidNum.toString();
                if (node.key) {
                    node.uid = node.uid + `_${node.key}`;
                }
                node.changedProps = this._getChangedProps(node.props);
            }
            node.owner = this._getOwner('add', node);
        }
        else if (item.type === PARSER_TYPES.TEXT) {
            let owner = this._getOwner('', null);
            if (owner && !owner.isComponent) {
                const oldTextConent = owner.textContent;
                owner.textContent = this._setContentProps(item.content, state, props);
                owner.textContentIsChanged = oldTextConent !== owner.textContent;
            }
        }
    }
    _compileCode(itemBegin, state, props, parsedTemplate, i) {
        let code = itemBegin.content.slice(2, itemBegin.content.indexOf('%}')).trim();
        if (code.startsWith('for')) {
            return this._compileCode__cycle_for({ itemBegin, state, props, parsedTemplate, i });
        }
        else if (code.startsWith('if')) {
            return this._compileCode__if(itemBegin, state, props, parsedTemplate, i);
        }
        return i;
    }
    _compileCode__cycle_for(data) {
        let codeBegin = data.itemBegin.content.slice(2, data.itemBegin.content.indexOf('%}')).trim();
        const cycleData = { ctx: {}, cycle: {} };
        const ctx = cycleData.ctx;
        const cycle = cycleData.cycle;
        ctx.state = data.state;
        ctx.props = data.props;
        // cycle-head \\
        // cycle-head_condition \\
        cycle.codeHead = codeBegin.substring(codeBegin.indexOf('(') + 1, codeBegin.indexOf(')')).trim().split(';');
        const begin = cycle.codeHead[0].trim().split(' ').filter((item) => item);
        cycle.i_name = begin[1];
        ctx[cycle.i_name] = Number(begin[3]);
        const condition = cycle.codeHead[1].trim().split(' ').filter((item) => item);
        cycle.sign = condition[1];
        cycle.right = window.get(ctx, condition[2], 0);
        let step = cycle.codeHead[2].trim();
        step = step.replace(begin[1], '');
        cycle.step = step;
        // cycle-head_condition //
        // cycle-head_tail \\
        cycle.codeTail = codeBegin.substring(codeBegin.indexOf('{') + 1).trim().split(';').filter((item) => item);
        cycle.vars = [];
        cycle.codeTail.forEach(function (item) {
            if (item.startsWith('let') || item.startsWith('const')) {
                cycle.vars.push(item.substring(item.indexOf(' ')).replace(/ /ig, '').split('='));
            }
        });
        // cycle-head_tail //
        // cycle-head //
        data.i_start = data.i;
        for (ctx[cycle.i_name]; this._compare(ctx[cycle.i_name], cycle.sign, cycle.right); ctx[cycle.i_name] = ctx[cycle.i_name] + this._inc(cycle.step)) {
            // cycle-vars \\
            cycle.vars.forEach(function (variable) {
                const param_i = /\[(.)\]/gm.exec(variable[1]);
                ctx[variable[0]] = window.get(ctx, variable[1].substring(0, param_i === null || param_i === void 0 ? void 0 : param_i.index))[ctx[param_i[1]]];
            });
            // cycle-vars //
            data.i = data.i_start;
            data.i++;
            let key = null;
            for (data.i; data.i < data.parsedTemplate.length; data.i++) {
                const itemTmpl = Object.assign({}, data.parsedTemplate[data.i]);
                if (itemTmpl.type === PARSER_TYPES.CODE) {
                    break;
                }
                window.regexpMatchAll(itemTmpl.content, this._REGEXP_PARAM).forEach(function (param) {
                    cycle.vars.forEach(function (variable) {
                        if (param[1] && param[1].startsWith(variable[0])) {
                            ctx.state[variable[0]] = ctx[variable[0]];
                            itemTmpl.content = itemTmpl.content.replace(param[0], '{{state.' + param[1] + '}}');
                        }
                    });
                });
                // key \\
                const keyIndex = itemTmpl.content.indexOf('key');
                if (itemTmpl.type === PARSER_TYPES.BEGIN) {
                    if (keyIndex > 0) {
                        const paramKey = new RegExp(this._REGEXP_PARAM).exec(itemTmpl.content.substring(keyIndex));
                        key = window.get(ctx, paramKey[1], paramKey[1]);
                        itemTmpl.content = itemTmpl.content.replace(new RegExp(paramKey[0], 'g'), key);
                    }
                    else {
                        itemTmpl.content += ' key=' + key;
                    }
                }
                // key //
                this._compileItem(itemTmpl, ctx.state, ctx.props);
            }
        }
        return data.i;
    }
    _compileCode__if($itemBegin, state, props, $parsedTemplate, $i) {
        const $stackItems = [];
        let item;
        let param;
        let regExp;
        let $code = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim();
        $i++;
        for ($i; $i < $parsedTemplate.length; $i++) {
            const $item = $parsedTemplate[$i];
            if ($item.type === PARSER_TYPES.CODE) {
                const $middleCode = $item.content.slice(2, $item.content.indexOf('%}')).trim();
                $code = $code + '\n' + $middleCode;
                if ($middleCode.indexOf('else') > 0) {
                    continue;
                }
                break;
            }
            $stackItems.push($item);
            $code = $code + '\n' +
                ` item = $stackItems[${$stackItems.length - 1}]`;
            $code = $code + '\n' + `  this._compileItem(item, state, props)`;
        }
        eval($code);
        return $i;
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
        this._getOwner('remove', null);
    }
    _getLevel(node) {
        let level = window.get(node, 'owner.level', -1);
        level++;
        return level;
    }
    _getHeaderProps(data) {
        let { header, tagName } = data;
        const node_props = {};
        const cacheTxt = {};
        let count = 1;
        window.regexpMatchAll(header, /[\'\"](.*?)[\'\"]/gi).forEach(function (txt) {
            if (txt[0]) {
                cacheTxt[`text${count}`] = txt[0];
                header = header.replace(txt[0], `text${count}`);
                count++;
            }
        });
        header.split(' ').forEach((keyValue) => {
            if (!keyValue || keyValue === tagName) {
                return;
            }
            const arrKeyValue = keyValue.split('=');
            if (cacheTxt[arrKeyValue[1]] && arrKeyValue.length > 1) {
                arrKeyValue[1] = cacheTxt[arrKeyValue[1]];
            }
            const param = new RegExp(this._REGEXP_PARAM).exec(arrKeyValue[1]);
            if (arrKeyValue[0] === 'className') {
                const strClasses = param ? window.get(data, param[1], '') : arrKeyValue[1].replace(/[\'\"]/g, '');
                node_props.classes = strClasses.split(' ');
            }
            else if (arrKeyValue.length === 1) {
                node_props[arrKeyValue[0]] = '#noValue';
            }
            else if (param) {
                node_props[arrKeyValue[0]] = window.get(data, param[1], param[1]);
            }
            else {
                node_props[arrKeyValue[0]] = arrKeyValue[1].replace(/[\'\"]/g, '');
            }
        });
        return node_props;
    }
    _setContentProps(content, state, props) {
        if (!content) {
            return content;
        }
        window.regexpMatchAll(content, this._REGEXP_PARAM).forEach(function (param) {
            if (param[1]) {
                content = content.replace(param[0], eval(param[1]));
            }
        });
        return content;
    }
    _setSignComponent(tagName) {
        return window.startsWithUpper(tagName);
    }
    _getChangedProps(newProps, oldProps = null) {
        const res = [];
        if (oldProps) {
            for (const key in newProps) {
                if (!window.isEqual(oldProps[key], newProps[key])) {
                    res.push(key);
                }
            }
        }
        else {
            for (const key in newProps) {
                res.push(key);
            }
        }
        return res;
    }
}
export { VirtDom, Node, ACTION };
//# sourceMappingURL=virtDOM.js.map