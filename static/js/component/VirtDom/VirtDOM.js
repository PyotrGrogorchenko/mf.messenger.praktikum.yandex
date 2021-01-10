import { PARSER_TYPES } from '../parser.js';
import { Node } from './Node.js';
// class StackItems {
//   _stack:Array<PARSER_NODE> = []
//   add(item: PARSER_NODE) {
//     this._stack.push(item)
//   }
//   get length() { return this._stack.length }
//   getItemByIndex(index: number) {
//     return this._stack[index]
//   }
// }
class VirtDom {
    constructor() {
        this._nodes = Array();
        this._owner = this._func_owner();
        this._currentUid = 0;
        this._REGEXP_PARAM = /\{\{(.*?)\}\}/gi;
    }
    compile(parsedTemplate, state, props) {
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
    _getTagName(str) {
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
    _func_owner() {
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
            const tagName = this._getTagName(item.content);
            const newProps = this._getHeaderProps({ header: item.content, tagNme: tagName, state, props });
            let node = this.getNodeByUidKey(item.uid, newProps.key);
            if (node) {
                node.setChangedProps(newProps, node.props);
                node.tagName = tagName;
                node.props = newProps;
            }
            else {
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
            node.owner = this._owner('add', node);
        }
        else if (item.type === PARSER_TYPES.TEXT) {
            let owner = this._owner('', null);
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
        data.i_start = data.i;
        for (ctx[cache.i_name]; this._compare(ctx[cache.i_name], cache.sign, cache.right); ctx[cache.i_name] = ctx[cache.i_name] + this._inc(cache.step)) {
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
        let compile = param;
        //if (param) {
        for (data.i; data.i < data.parsedTemplate.length; data.i++) {
            const itemTmpl = data.parsedTemplate[data.i];
            if (itemTmpl.type === PARSER_TYPES.CODE) {
                if (itemTmpl.content.indexOf('else') > 0) {
                    compile = !compile;
                    continue;
                }
                else {
                    break;
                }
            }
            if (compile) {
                this._compileItem(itemTmpl, data.state, data.props);
            }
        }
        // } else {
        // }
        //console.log(param)
        // const $stackItems:Array<PARSER_NODE> = []
        // let item: PARSER_NODE 
        // let param: any 
        // let regExp: RegExp
        // let $code: string = $itemBegin.content.slice(2, $itemBegin.content.indexOf('%}')).trim() 
        // $i++
        // for($i; $i < $parsedTemplate.length; $i++) {
        //   const $item = $parsedTemplate[$i]
        //   if ($item.type === PARSER_TYPES.CODE) {
        //     const $middleCode = $item.content.slice(2, $item.content.indexOf('%}')).trim() 
        //     $code = $code + '\n' + $middleCode 
        //     if ($middleCode.indexOf('else') > 0){
        //       continue
        //     }
        //     break
        //   } 
        //   $stackItems.push($item)
        //   $code = $code + '\n' + 
        //   ` item = $stackItems[${$stackItems.length - 1}]`
        //   $code = $code + '\n' + `  this._compileItem(item, state, props)`
        // }
        // eval($code)
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
        this._owner('remove', null);
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
}
export { VirtDom };
//# sourceMappingURL=VirtDOM.js.map