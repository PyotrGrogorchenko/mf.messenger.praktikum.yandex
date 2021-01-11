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
        for (let i = 0; i < parsedTemplate.length; i++) {
            const item = parsedTemplate[i];
            if (item.type === PARSER_TYPES.CODE) {
                const data = { item, state, props, parsedTemplate, i };
                this._compileCode(data);
                i = data.i;
            }
            else {
                this._compileItem(item, state, props);
            }
        }
    }
    _compileItem(item, state, props) {
        switch (item.type) {
            case PARSER_TYPES.END:
                this._closeTag();
                break;
            case PARSER_TYPES.TEXT:
                this._compileItem_process(item, state, props);
                break;
            case PARSER_TYPES.BEGIN:
                this._compileItem_process(item, state, props);
                break;
            default:
                throw new Error(`Tree: error initializing the tree for: ${item.type} ${item.content}`);
        }
    }
    _compileItem_process(item, state, props) {
        if (item.type === PARSER_TYPES.BEGIN) {
            const tagName = this._getTagName(item.content);
            const newProps = this._getHeaderProps({ header: item.content, tagNme: tagName, state, props });
            let node = this.getNodeByUidKey(item.uid, newProps.key);
            if (node) {
                node.setChangedProps(newProps, node.props);
                node.tagName = tagName;
                node.props = newProps;
                node.deleteMark = this.deleteMark || item.deleteMark;
            }
            else {
                if (this.deleteMark || item.deleteMark) {
                    return;
                }
                node = new Node();
                this._nodes.push(node);
                node.tagName = tagName;
                node.props = newProps;
                node.header = item.content;
                node.uidNum = item.uid;
                node.key = newProps.key ? newProps.key : '';
                node.setLevel();
                node.setSignComponent();
                node.setUid();
                node.setChangedProps(node.props);
            }
            node.parent = this._parent('add', node);
        }
        else if (item.type === PARSER_TYPES.TEXT) {
            let owner = this._parent('', null);
            if (owner && !owner.isComponent) {
                owner.setContentProps({ content: item.content, state, props });
            }
        }
    }
    _compileCode(data) {
        this._compileCode__cycle_for(data);
        this._compileCode__if(data);
    }
    _compileCode__cycle_for(data) {
        let code = data.item.content.slice(2, data.item.content.indexOf('%}')).trim();
        if (!code.startsWith('for'))
            return;
        const localData = { ctx: {}, cache: {} };
        const ctx = localData.ctx;
        const cache = localData.cache;
        ctx.state = data.state;
        ctx.props = data.props;
        // cycle-head \\
        // cycle-head_condition \\
        cache.codeHead = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim().split(';');
        const begin = cache.codeHead[0].trim().split(' ').filter((item) => item);
        cache.i_name = begin[1];
        ctx[cache.i_name] = Number(begin[3]);
        const condition = cache.codeHead[1].trim().split(' ').filter((item) => item);
        cache.sign = condition[1];
        cache.right = window.get(ctx, condition[2], 0);
        let step = cache.codeHead[2].trim();
        step = step.replace(begin[1], '');
        cache.step = step;
        // cycle-head_condition //
        // cycle-head_tail \\
        cache.codeTail = code.substring(code.indexOf('{') + 1).trim().split(';').filter((item) => item).map((item) => item.trim());
        cache.vars = [];
        cache.codeTail.forEach(function (item) {
            if (item.startsWith('let') || item.startsWith('const')) {
                cache.vars.push(item.substring(item.indexOf(' ')).replace(/ /ig, '').split('='));
            }
        });
        // cycle-head_tail //
        // cycle-head //
        //console.log('//////////////////////////////', ctx.state.list ? ctx.state.list.length : '')
        data.i_start = data.i;
        for (ctx[cache.i_name]; this._compare(ctx[cache.i_name], cache.sign, cache.right); ctx[cache.i_name] = ctx[cache.i_name] + this._inc(cache.step)) {
            //console.log('//////////////')
            // cycle-vars \\
            cache.vars.forEach(function (variable) {
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
                //console.log(itemTmpl)
                window.regexpMatchAll(itemTmpl.content, this._REGEXP_PARAM).forEach(function (param) {
                    cache.vars.forEach(function (variable) {
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
            //console.log('//////////////')
        }
    }
    _compileCode__if(data) {
        let code = data.item.content.slice(2, data.item.content.indexOf('%}')).trim();
        if (!code.startsWith('if'))
            return;
        const codeParam = code.substring(code.indexOf('(') + 1, code.indexOf(')')).trim();
        const rgParam = new RegExp(this._REGEXP_PARAM).exec(codeParam);
        let param = true;
        if (rgParam) {
            param = window.get(data, rgParam[1], rgParam[1]);
        }
        data.i++;
        //let deleteMark = param
        for (data.i; data.i < data.parsedTemplate.length; data.i++) {
            const itemTmpl = data.parsedTemplate[data.i];
            if (itemTmpl.type === PARSER_TYPES.CODE) {
                if (itemTmpl.content.indexOf('else') > 0) {
                    param = !param;
                    continue;
                }
                else {
                    break;
                }
            }
            //if (compile){
            itemTmpl.deleteMark = !param;
            this._compileItem(itemTmpl, data.state, data.props);
            //} else {
            //  itemTmpl.delete = true  
            //}
        }
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
    deleteMarkedNodes() {
        //let deleteIndexes: Array<number> = []
        this._nodes.forEach((node) => {
            var _a;
            if (node.deleteMark) {
                if (node.isComponent && node.componentLink) {
                    (_a = node.componentLink.virtDOM) === null || _a === void 0 ? void 0 : _a.deleteMarkedNodes();
                }
                //deleteIndexes.push(i)
                this._nodes = this._nodes.filter((node) => !node.deleteMark);
            }
        });
        // for(let i = deleteIndexes.length-1; i >= 0; i--) {
        //   //this._nodes = this._nodes.slice(deleteIndexes[i],deleteIndexes[i])
        //   this._nodes = this._nodes.filter((node:Node) => item)
        //   slice(deleteIndexes[i],deleteIndexes[i])
        //   //console.log(this._nodes)
        //   delete this._nodes[deleteIndexes[i]]
        //   //console.log(this._nodes[deleteIndexes[i]].uid, this._nodes[deleteIndexes[i]].header)
        // }
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